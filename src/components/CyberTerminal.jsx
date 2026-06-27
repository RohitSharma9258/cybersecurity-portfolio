import React, { useState, useEffect, useRef, useCallback } from 'react';
import { resolveCommand } from '../utils/terminalCommands';

const INITIAL_HISTORY = [
  'Initializing Secure Shell (SSH) connection...',
  'System: AES-256 decrypted packet key accepted.',
  'Status: Connected to rohit@cyber-sec-deck.sh',
  '',
  'Type "help" to list all available system diagnostics.',
  '',
];

const RESET_TIMEOUT_MS = 1000;

const CyberTerminal = () => {
  const [output, setOutput] = useState(INITIAL_HISTORY);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]); // actual command history
  const [historyIdx, setHistoryIdx] = useState(-1);  // up/down navigation index
  const [currentDir, setCurrentDir] = useState('/home/rohit');
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  const getDisplayPath = useCallback((path) => {
    if (path === '/home/rohit') return '~';
    if (path.startsWith('/home/rohit/')) return '~/' + path.slice(12);
    return path;
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [output]);

  const appendOutput = useCallback((lines) => {
    setOutput((prev) => [...prev, ...(Array.isArray(lines) ? lines : [lines]), '']);
  }, []);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const raw = input.trim();
    if (!raw) return;

    const displayPath = getDisplayPath(currentDir);
    const prompt = `rohit@cyber-sec-deck:${displayPath}# ${raw}`;
    setOutput((prev) => [...prev, prompt]);

    const lower = raw.toLowerCase();

    // Save to command history (newest first for up-arrow)
    setCmdHistory((prev) => [raw, ...prev]);
    setHistoryIdx(-1);
    setInput('');

    // Special: clear
    if (lower === 'clear') {
      setOutput([]);
      return;
    }

    // Special: history
    if (lower === 'history') {
      const lines = cmdHistory.length
        ? cmdHistory.map((c, i) => `  ${cmdHistory.length - i}  ${c}`)
        : ['  (no commands in history)'];
      appendOutput(['COMMAND HISTORY:', ...lines]);
      return;
    }

    // Special: exit
    if (lower === 'exit') {
      appendOutput(['[LOG]: SSH session terminated.', '[LOG]: Reloading virtual terminal node...']);
      setTimeout(() => setOutput(INITIAL_HISTORY), RESET_TIMEOUT_MS);
      return;
    }

    // Resolve via unified dispatcher (handles multi-word commands too)
    const result = resolveCommand(raw, (asyncText) => {
      setOutput((prev) => [...prev, `[LOG]: ${asyncText}`]);
    }, currentDir);

    if (result === null) {
      appendOutput([`Command "${raw}" not recognized. Type "help" for a list of valid commands.`]);
      return;
    }

    let outputLines = result;
    if (result && typeof result === 'object' && !Array.isArray(result)) {
      if (result.newDir !== undefined) {
        setCurrentDir(result.newDir);
      }
      if (result.isAsync) {
        result.run();
        return;
      }
      outputLines = result.output;
    }

    appendOutput(outputLines);
  };

  // Arrow-key command history navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const nextIdx = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(nextIdx);
      setInput(cmdHistory[nextIdx] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIdx = Math.max(historyIdx - 1, -1);
      setHistoryIdx(nextIdx);
      setInput(nextIdx === -1 ? '' : (cmdHistory[nextIdx] ?? ''));
    }
  };

  const focusInput = () => inputRef.current?.focus();

  const getLineColor = (line) => {
    if (!line) return 'text-cyan-400/90';
    if (line.startsWith('rohit@cyber-sec-deck')) return 'text-white';
    if (line.startsWith('[LOG]') || line.startsWith('SUCCESS')) return 'text-emerald-400 font-semibold';
    if (line.startsWith('[ERROR]') || line.startsWith('[WARN]')) return 'text-red-400';
    if (line.startsWith('│') || line.startsWith('┌') || line.startsWith('└') || line.startsWith('══')) return 'text-cyan-300/80';
    if (line.startsWith('drwx') || line.startsWith('-rw')) return 'text-blue-300';
    return 'text-cyan-400/90';
  };

  return (
    <div
      role="region"
      aria-label="Interactive Linux terminal"
      className="glass-panel border-cyan-500/20 hover:border-cyan-500/40 rounded-lg p-4 font-code text-xs md:text-sm text-cyan-400 border shadow-2xl relative overflow-hidden h-[420px] flex flex-col cursor-text transition-all duration-300"
      onClick={focusInput}
    >
      {/* Terminal chrome header */}
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 mb-3 select-none flex-shrink-0" aria-hidden="true">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
          <span className="ml-2 text-[10px] text-neutral-500 tracking-wider">rohit@cyber-sec-deck — bash</span>
        </div>
        <div className="text-[10px] text-neutral-500 font-cyber">SESSION: ACTIVE</div>
      </div>

      {/* Terminal output */}
      <div className="flex-grow overflow-y-auto pr-1 space-y-0.5 mb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyan-900/60">
        {output.map((line, idx) => (
          <div
            key={idx}
            className={`whitespace-pre-wrap leading-relaxed ${getLineColor(line)}`}
          >
            {line || '\u00A0'}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Input form */}
      <form
        onSubmit={handleCommandSubmit}
        className="flex items-center select-none pt-2 border-t border-cyan-500/10 flex-shrink-0"
      >
        <span className="text-white mr-2 whitespace-nowrap flex-shrink-0" aria-hidden="true">
          rohit@cyber-sec-deck:{getDisplayPath(currentDir)}#
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => { setInput(e.target.value); setHistoryIdx(-1); }}
          onKeyDown={handleKeyDown}
          className="flex-grow bg-transparent border-none outline-none text-white focus:ring-0 p-0 font-code font-light m-0"
          placeholder="type a command..."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          aria-label="Terminal command input"
        />
      </form>
    </div>
  );
};

export default CyberTerminal;
