// terminalCommands.js — Full command registry and mock filesystem for rohit@cyber-sec-deck shell

const ABOUT_CONTENT = `══════════════════════════════════════
 PROFILE: Rohit Sharma
══════════════════════════════════════
 Role    : Cybersecurity Student | Software Developer
           AI Security Enthusiast | Python Developer
 Location: Mathura, Uttar Pradesh, India
 Passion : Building defensive network scripts, automating
           vulnerability scans, securing web interfaces,
           and training custom threat-scoring engines.
══════════════════════════════════════`;

const RESUME_CONTENT = `══════════════════════════════════════
 ROHIT SHARMA — CURRICULUM VITAE
══════════════════════════════════════
 Email    : rohitsharma40421@gmail.com
 Phone    : +91 93684 13352
 Location : Mathura, Uttar Pradesh, India

 EDUCATION
 B.Tech CSE — GLA University (2024-2028)

 CERTIFICATIONS
 Cisco Introduction to Cybersecurity

 SKILLS
 Python | Java | JavaScript | Scapy | Wireshark
 OWASP Top 10 | Flask | SQLite | TCP/IP | Asyncio

 PROJECTS
 ▸ Smart Wi-Fi Intruder Detection System
 ▸ Vanguard Port Scanner

 PROFILES
 GitHub   : github.com/RohitSharma9258
 LeetCode : leetcode.com/u/rohitsharma925880
 THM      : tryhackme.com/p/rohitsharma9
══════════════════════════════════════`;

const README_CONTENT = `# rohit@cyber-sec-deck
Cybersecurity Student | Software Developer | AI Enthusiast
Run \`help\` to see all available commands.`;

const CONTACT_CONTENT = `SECURE CHANNELS:
  Email    : rohitsharma40421@gmail.com
  Phone    : +91 93684 13352
  Location : Mathura, Uttar Pradesh, India
  GitHub   : github.com/RohitSharma9258
  LinkedIn : linkedin.com/in/rohit-sharma-404306310`;

export const MOCK_FS = {
  '/home/rohit': {
    type: 'dir',
    children: {
      'about.md': { type: 'file', content: ABOUT_CONTENT },
      'resume.txt': { type: 'file', content: RESUME_CONTENT },
      'readme.md': { type: 'file', content: README_CONTENT },
      'contact.txt': { type: 'file', content: CONTACT_CONTENT },
      'projects': {
        type: 'dir',
        children: {
          'wifi-intruder-detector.md': {
            type: 'file',
            content: `PROJECT: Smart Wi-Fi Intruder Detection System
════════════════════════════════════════════════
Stack : Python · Flask · Scapy · SQLite
Info  : Live device discovery, active threat scoring,
        iptables firewall rule injection, and dashboard metrics.
        Built to secure home environments against MITM / ARP Spoofing.`
          },
          'vanguard-port-scanner.md': {
            type: 'file',
            content: `PROJECT: Vanguard Port Scanner
════════════════════════════════════════════════
Stack : Python · Asyncio · REST API · SQLite
Info  : Non-blocking parallel socket scanner that queries
        hundreds of ports concurrently. Features CIDR resolution,
        banner grabbing, and a clean JSON REST API layer.`
          },
          'rohit-portfolio.md': {
            type: 'file',
            content: `PROJECT: Rohit Portfolio
════════════════════════════════════════════════
Stack : React 19 · Vite · Tailwind CSS v4 · Framer Motion
Info  : Premium cybersecurity terminal and HUD dashboard
        portfolio displaying metrics, profiles, and interactive tools.`
          }
        }
      },
      'skills': {
        type: 'dir',
        children: {
          'languages.txt': { type: 'file', content: "LANGUAGES:\n- Python\n- Java\n- JavaScript\n- HTML\n- CSS" },
          'security_tools.txt': { type: 'file', content: "SECURITY TOOLS:\n- Wireshark\n- Scapy\n- Burp Suite\n- Metasploit\n- Nmap" },
          'networking.txt': { type: 'file', content: "NETWORKING:\n- TCP/IP\n- DNS\n- HTTP/S\n- ARP\n- Packet Sniffing\n- Firewalls (iptables)" },
          'databases.txt': { type: 'file', content: "DATABASES:\n- MySQL\n- SQLite" }
        }
      },
      'certs': {
        type: 'dir',
        children: {
          'cisco_intro_cyber.txt': { type: 'file', content: "CISCO INTRODUCTION TO CYBERSECURITY:\n- Issued by Cisco Networking Academy\n- Content: Threat landscape, endpoints protection, encryption basics." },
          'tryhackme_top5.txt': { type: 'file', content: "TRYHACKME ACHIEVEMENT:\n- Global Rank: Top 5%\n- Rooms Completed: 20+\n- Areas: Web hacking, Linux forensics, OSINT." }
        }
      },
      'blog': {
        type: 'dir',
        children: {
          'ai_security.md': { type: 'file', content: "AI SECURITY BRIEF:\n- Large language models introduce injection prompts.\n- Security pipelines need defense-in-depth sanitization." },
          'packet_analysis.md': { type: 'file', content: "PACKET AUDIT TIPS:\n- Use Python Scapy for low-level packet crafting.\n- Filter on target broadcast frames to isolate noise." }
        }
      }
    }
  }
};

// Helper: Resolve target path relative to currentPath
export const resolvePath = (currentPath, targetPath) => {
  if (!targetPath || targetPath === '~') return '/home/rohit';
  
  let absolutePath = targetPath.startsWith('/')
    ? targetPath
    : `${currentPath}/${targetPath}`;

  // Clean trailing slashes & double slashes
  const segments = absolutePath.split('/').filter(Boolean);
  const stack = [];

  for (const segment of segments) {
    if (segment === '..') {
      if (stack.length > 0) stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  return '/' + stack.join('/');
};

// Helper: Get filesystem node at absolute path
export const getNode = (path) => {
  if (path === '/') {
    return {
      type: 'dir',
      children: {
        'home': {
          type: 'dir',
          children: {
            'rohit': MOCK_FS['/home/rohit']
          }
        }
      }
    };
  }

  if (path === '/home') {
    return {
      type: 'dir',
      children: {
        'rohit': MOCK_FS['/home/rohit']
      }
    };
  }

  const segments = path.split('/').filter(Boolean);
  if (segments[0] === 'home' && segments[1] === 'rohit') {
    let current = MOCK_FS['/home/rohit'];
    for (let i = 2; i < segments.length; i++) {
      const seg = segments[i];
      if (current && current.type === 'dir' && current.children[seg]) {
        current = current.children[seg];
      } else {
        return null;
      }
    }
    return current;
  }

  return null;
};

export const terminalCommands = {
  help: () => [
    '┌─ AVAILABLE SYSTEM COMMANDS ──────────────────────────────────────────────────┐',
    '│  whoami       Display current active user descriptor                         │',
    '│  about        View professional bio dossier                                  │',
    '│  education    Display academic background details                            │',
    '│  skills       List technical skill arrays                                    │',
    '│  projects     List compiled development projects                             │',
    '│  experience   Output timeline history records                                │',
    '│  certificates Show credential certificates                                   │',
    '│  resume       Load binary download handle for CV                             │',
    '│  github       Open GitHub developer profile                                  │',
    '│  linkedin     Open LinkedIn connection profile                               │',
    '│  leetcode     Open LeetCode profile link                                     │',
    '│  tryhackme    Open TryHackMe profile link                                    │',
    '│  contact      Read encrypted contact details                                 │',
    '│  neofetch     Display system stats and ASCII logo                            │',
    '│  matrix       Trigger ASCII digital binary rain sequence                     │',
    '│  hack         Run automated network intrusion sandbox                        │',
    '│  theme        Toggle terminal color scheme                                   │',
    '│  ascii        Display ASCII art banner                                       │',
    '│  banner       Show styled welcome banner                                     │',
    '├─ LINUX STANDARD CORE UTILS ──────────────────────────────────────────────────┤',
    '│  pwd          Print working directory path                                   │',
    '│  ls [path]    List directory contents (supports cd paths)                    │',
    '│  cd [path]    Change active shell directory (~, .., relative, absolute)      │',
    '│  cat [file]   Read raw contents of a mock file                               │',
    '│  grep [pat]   Search for matching pattern strings in file                    │',
    '│  uname [-a]   Print operating system name/kernel info                        │',
    '│  id           Print active user IDs and security groups                      │',
    '│  hostname     Print node name of system shell                                │',
    '│  ip / ifcfg   Display active network adapter configuration                   │',
    '│  ping [host]  Initiate ICMP echo stream diagnostics                          │',
    '│  top / ps     Show running processes and task telemetry                      │',
    '│  df / free    Display system storage and memory allocations                  │',
    '│  echo [args]  Print text arguments to stdout                                 │',
    '│  curl [url]   Perform simulated network query fetch                          │',
    '│  mkdir/touch  Simulate directory and file creation handles                   │',
    '│  rm [file]    Simulate directory/file deletion handles                      │',
    '│  clear / exit Flush logs / reload virtual terminal node                      │',
    '└──────────────────────────────────────────────────────────────────────────────┘',
  ],

  whoami: () => ['rohit'],

  about: () => [ABOUT_CONTENT],

  education: () => [
    'Institution : GLA University, Mathura',
    'Degree      : B.Tech in Computer Science Engineering',
    'Timeline    : 2024 — 2028',
    'Status      : In Progress',
    'Focus Areas : Network Security, AI/ML, Software Development',
    'Cert        : Cisco Introduction to Cybersecurity',
  ],

  skills: () => [
    'PROGRAMMING  : Python, Java, JavaScript, HTML, CSS',
    'SECURITY     : Wireshark, Scapy, Burp Suite, Metasploit',
    '             : OWASP Top 10, Cryptography, API Security',
    'NETWORKING   : TCP/IP, DNS, HTTP/S, ARP, Packet Audits',
    '             : iptables, Firewall Configs',
    'DATABASES    : MySQL, SQLite',
    'FRAMEWORKS   : Flask, Asyncio, Scikit-learn',
    'DEV TOOLS    : Git, GitHub, VS Code, REST APIs',
  ],

  projects: () => [
    '┌─ PROJECT REGISTRY ──────────────────────────────────────────┐',
    '│  [01] Smart Wi-Fi Intruder Detection System                 │',
    '│       Stack : Python · Flask · Scapy · SQLite               │',
    '│       Info  : Live device discovery, threat scoring,        │',
    '│              iptables rule injection, real-time dashboard.  │',
    '│                                                             │',
    '│  [02] Vanguard Port Scanner                                 │',
    '│       Stack : Python · Asyncio · REST API · SQLite          │',
    '│       Info  : Non-blocking parallel socket scanner,         │',
    '│              CIDR/DNS resolver, structured JSON output.     │',
    '└─────────────────────────────────────────────────────────────┘',
  ],

  experience: () => [
    'TIMELINE:',
    '  2024     » Enrolled B.Tech CSE @ GLA University, Mathura',
    '  2024     » Built Smart Wi-Fi Intruder Detection System',
    '  2024     » Built Vanguard Async Port Scanner',
    '  2025     » Cisco Intro to Cybersecurity Certificate',
    '  2025     » Actively practicing in TryHackMe CTF labs',
    '  2025     » Solved 150+ LeetCode algorithmic challenges',
    '  2026     » Building AI-assisted threat detection models',
  ],

  certificates: () => [
    'Organization  : Cisco Networking Academy',
    'Certification : Introduction to Cybersecurity',
    'Status        : COMPLETED ✓',
    'Focus         : Network protection, encryption, threat defense',
    '',
    'Platform      : TryHackMe',
    'Rooms Done    : 20+',
    'Rank          : Top 5% Globally',
  ],

  resume: () => {
    setTimeout(() => window.open('/resume.pdf', '_blank'), 500);
    return [
      'Triggering download of "resume.pdf" in background thread...',
      'SUCCESS: PDF stream initiated.',
    ];
  },

  github: () => {
    setTimeout(() => window.open('https://github.com/RohitSharma9258', '_blank'), 500);
    return ['Opening  →  https://github.com/RohitSharma9258'];
  },

  linkedin: () => {
    setTimeout(() => window.open('https://linkedin.com/in/rohit-sharma-404306310', '_blank'), 500);
    return ['Opening  →  https://linkedin.com/in/rohit-sharma-404306310'];
  },

  leetcode: () => {
    setTimeout(() => window.open('https://leetcode.com/u/rohitsharma925880', '_blank'), 500);
    return ['Opening  →  https://leetcode.com/u/rohitsharma925880'];
  },

  tryhackme: () => {
    setTimeout(() => window.open('https://tryhackme.com/p/rohitsharma9', '_blank'), 500);
    return ['Opening  →  https://tryhackme.com/p/rohitsharma9'];
  },

  contact: () => [
    'SECURE CHANNELS:',
    '  Email    : rohitsharma40421@gmail.com',
    '  Phone    : +91 93684 13352',
    '  Location : Mathura, Uttar Pradesh, India',
    '  GitHub   : github.com/RohitSharma9258',
    '  LinkedIn : linkedin.com/in/rohit-sharma-404306310',
  ],

  date: () => [new Date().toString()],

  sudo: () => [
    '[sudo] password for rohit: ',
    'rohit is not in the sudoers file. This incident will be reported.',
  ],

  neofetch: () => [
    '      /\\_/\\       rohit@cyber-sec-deck.sh',
    '     ( o.o )      ─────────────────────',
    '      > ^ <       OS      : CyberShield GNU/Linux x86_64',
    '     |     |      Host    : GLA-Uni-Terminal-2024-2028',
    '                  Kernel  : 6.26-rohit-sec-core',
    '                  Shell   : bash 5.2.15',
    '                  Degree  : B.Tech CSE @ GLA University',
    '                  THM     : Top 5% Globally',
    '                  LeetCode: 150+ Solved',
    '                  Memory  : 9.25 GB / 16 GB (58%)',
    '                  Status  : SECURITY MONITORING ACTIVE',
  ],

  matrix: (outputLogCallback) => ({
    isAsync: true,
    run: () => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < 12) {
          const line = Array.from({ length: 48 }, () =>
            Math.random() > 0.5 ? '1' : '0'
          ).join('');
          outputLogCallback(line);
          i++;
        } else {
          clearInterval(interval);
          outputLogCallback('Matrix stream complete. All packets accounted for.');
        }
      }, 130);
    },
  }),

  hack: (outputLogCallback) => ({
    isAsync: true,
    run: () => runHackSimulation(outputLogCallback),
  }),

  theme: () => [
    '🎨 Terminal color theme toggled.',
    'Available themes: [MATRIX_GREEN] [CYBER_CYAN] [STEALTH_RED]',
    'Current theme: CYBER_CYAN (default)',
    'Note: Theme switching is visual-only in this demo.',
  ],

  ascii: () => [
    '',
    '  ██████╗  ██████╗ ██╗  ██╗██╗████████╗',
    '  ██╔══██╗██╔═══██╗██║  ██║██║╚══██╔══╝',
    '  ██████╔╝██║   ██║███████║██║   ██║   ',
    '  ██╔══██╗██║   ██║██╔══██║██║   ██║   ',
    '  ██║  ██║╚██████╔╝██║  ██║██║   ██║   ',
    '  ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝   ╚═╝   ',
    '',
    '  ███████╗██╗  ██╗ █████╗ ██████╗ ███╗   ███╗ █████╗ ',
    '  ██╔════╝██║  ██║██╔══██╗██╔══██╗████╗ ████║██╔══██╗',
    '  ███████╗███████║███████║██████╔╝██╔████╔██║███████║',
    '  ╚════██║██╔══██║██╔══██║██╔══██╗██║╚██╔╝██║██╔══██║',
    '  ███████║██║  ██║██║  ██║██║  ██║██║ ╚═╝ ██║██║  ██║',
    '  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝',
    '',
    '  Cybersecurity Engineer | Software Developer',
    '',
  ],

  banner: () => [
    '',
    '╔══════════════════════════════════════════════════════╗',
    '║                                                      ║',
    '║   ⚡ WELCOME TO ROHIT SHARMA\'S CYBER TERMINAL ⚡     ║',
    '║                                                      ║',
    '║   🔒 Cybersecurity Engineer & Developer              ║',
    '║   🎓 B.Tech CSE @ GLA University                     ║',
    '║   🏆 Top 5% TryHackMe | 150+ LeetCode               ║',
    '║   🐍 Python | React | Flask | Scapy                  ║',
    '║                                                      ║',
    '║   Type "help" for available commands                  ║',
    '║   Type "hack" for a penetration test demo             ║',
    '║                                                      ║',
    '╚══════════════════════════════════════════════════════╝',
    '',
  ],
};

// Stateful Command Dispatcher
export const resolveCommand = (rawInput, asyncCallback, currentDir = '/home/rohit') => {
  const cleanInput = rawInput.trim();
  if (!cleanInput) return [];

  // Parse command and arguments
  const parts = cleanInput.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  // 1. cd command
  if (cmd === 'cd') {
    const target = args[0] || '~';
    const resolved = resolvePath(currentDir, target);
    const targetNode = getNode(resolved);
    if (!targetNode) {
      return [`cd: no such file or directory: ${target}`];
    }
    if (targetNode.type !== 'dir') {
      return [`cd: not a directory: ${target}`];
    }
    return {
      output: [],
      newDir: resolved
    };
  }

  // 2. pwd command
  if (cmd === 'pwd') {
    return [currentDir];
  }

  // 3. ls command
  if (cmd === 'ls') {
    const targetPath = args[0] ? resolvePath(currentDir, args[0]) : currentDir;
    const targetNode = getNode(targetPath);
    if (!targetNode) {
      return [`ls: cannot access '${args[0]}': No such file or directory`];
    }
    if (targetNode.type !== 'dir') {
      return [targetNode.content || targetPath];
    }
    const lines = [];
    for (const name in targetNode.children) {
      const child = targetNode.children[name];
      if (child.type === 'dir') {
        lines.push(`drwxr-xr-x  rohit rohit  4096 Jun 27 13:00 ${name}/`);
      } else {
        const size = child.content.length;
        lines.push(`-rw-r--r--  rohit rohit  ${size.toString().padStart(4, ' ')} Jun 27 13:00 ${name}`);
      }
    }
    return lines.length > 0 ? lines : ['(empty directory)'];
  }

  // 4. cat command
  if (cmd === 'cat') {
    if (!args[0]) return ['cat: missing file operand'];
    const targetPath = resolvePath(currentDir, args[0]);
    const fileNode = getNode(targetPath);
    if (!fileNode) {
      return [`cat: ${args[0]}: No such file or directory`];
    }
    if (fileNode.type !== 'file') {
      return [`cat: ${args[0]}: Is a directory`];
    }
    return fileNode.content.split('\n');
  }

  // 5. grep command
  if (cmd === 'grep') {
    if (args.length < 2) return ['Usage: grep [pattern] [file]'];
    const pattern = args[0];
    const fileTarget = args[1];
    const targetPath = resolvePath(currentDir, fileTarget);
    const fileNode = getNode(targetPath);
    if (!fileNode) {
      return [`grep: ${fileTarget}: No such file or directory`];
    }
    if (fileNode.type !== 'file') {
      return [`grep: ${fileTarget}: Is a directory`];
    }
    const matches = fileNode.content.split('\n').filter(line => 
      line.toLowerCase().includes(pattern.toLowerCase())
    );
    return matches.length > 0 ? matches : ['(no matches found)'];
  }

  // 6. uname command
  if (cmd === 'uname') {
    if (args.includes('-a')) {
      return ['CyberShield 6.26-rohit-sec-core #1 SMP PREEMPT_DYNAMIC Sat Jun 27 13:00:00 UTC 2026 x86_64 GNU/Linux'];
    }
    return ['Linux'];
  }

  // 7. id command
  if (cmd === 'id') {
    return ['uid=1000(rohit) gid=1000(rohit) groups=1000(rohit),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev)'];
  }

  // 8. hostname command
  if (cmd === 'hostname') {
    return ['cyber-sec-deck.sh'];
  }

  // 9. ip / ifconfig commands
  if (cmd === 'ip') {
    const argStr = args.join(' ');
    if (argStr.includes('addr') || argStr.includes('a') || args.length === 0) {
      return [
        '1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000',
        '    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00',
        '    inet 127.0.0.1/8 scope host lo',
        '       valid_lft forever preferred_lft forever',
        '2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000',
        '    link/ether 02:42:ac:11:00:02 brd ff:ff:ff:ff:ff:ff',
        '    inet 192.168.1.15/24 brd 192.168.1.255 scope global eth0',
        '       valid_lft forever preferred_lft forever',
        '3: wlan0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default',
        '    link/ether a4:c4:94:02:11:de brd ff:ff:ff:ff:ff:ff',
        '    inet 10.0.0.45/24 brd 10.0.0.255 scope global wlan0',
        '       valid_lft forever preferred_lft forever'
      ];
    }
    return [`ip: arg "${argStr}" not simulated`];
  }
  if (cmd === 'ifconfig' || cmd === 'ifcfg') {
    return [
      'eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500',
      '        inet 192.168.1.15  netmask 255.255.255.0  broadcast 192.168.1.255',
      '        ether 02:42:ac:11:00:02  txqueuelen 1000  (Ethernet)',
      '        RX packets 241054  bytes 184025804 (184.0 MB)',
      '        TX packets 158932  bytes 12903482 (12.9 MB)',
      '',
      'lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536',
      '        inet 127.0.0.1  netmask 255.0.0.0',
      '        loop  txqueuelen 1000  (Local Loopback)',
      '        RX packets 4502  bytes 384025 (384.0 KB)',
      '        TX packets 4502  bytes 384025 (384.0 KB)'
    ];
  }

  // 10. ping command
  if (cmd === 'ping') {
    if (!args[0]) return ['ping: missing host operand'];
    const target = args[0];
    return {
      isAsync: true,
      run: () => {
        let count = 0;
        asyncCallback(`PING ${target} (8.8.8.8) 56(84) bytes of data.`);
        const interval = setInterval(() => {
          if (count < 4) {
            const time = (Math.random() * 15 + 5).toFixed(1);
            asyncCallback(`64 bytes from ${target} (8.8.8.8): icmp_seq=${count + 1} ttl=64 time=${time} ms`);
            count++;
          } else {
            clearInterval(interval);
            asyncCallback(`--- ${target} ping statistics ---`);
            asyncCallback(`4 packets transmitted, 4 received, 0% packet loss, time 3004ms`);
            asyncCallback(`rtt min/avg/max/mdev = 5.2/8.4/15.1/2.8 ms`);
          }
        }, 700);
      }
    };
  }

  // 11. echo command
  if (cmd === 'echo') {
    return [args.join(' ')];
  }

  // 12. curl / wget commands
  if (cmd === 'curl') {
    if (!args[0]) return ['curl: no URL specified'];
    const url = args[0];
    return {
      isAsync: true,
      run: () => {
        asyncCallback(`Connecting to ${url}...`);
        setTimeout(() => {
          asyncCallback(`HTTP/1.1 200 OK`);
          asyncCallback(`Content-Type: text/html; charset=UTF-8`);
          asyncCallback(`Server: Apache/2.4.41 (Ubuntu)`);
          asyncCallback(``);
          asyncCallback(`<!DOCTYPE html>`);
          asyncCallback(`<html><head><title>Secure Page</title></head>`);
          asyncCallback(`<body><h1>Connection established. Encryption layer verified.</h1></body>`);
          asyncCallback(`</html>`);
        }, 800);
      }
    };
  }
  if (cmd === 'wget') {
    if (!args[0]) return ['wget: missing URL'];
    const url = args[0];
    return {
      isAsync: true,
      run: () => {
        asyncCallback(`--2026-06-27 13:00:00--  ${url}`);
        asyncCallback(`Resolving ${url}... 192.168.1.100`);
        asyncCallback(`Connecting to ${url}|192.168.1.100|:80... connected.`);
        asyncCallback(`HTTP request sent, awaiting response... 200 OK`);
        asyncCallback(`Length: 1048 (1.0K) [text/html]`);
        asyncCallback(`Saving to: ‘index.html’`);
        asyncCallback(``);
        asyncCallback(`index.html          100%[===================>]   1.02K  --.-KB/s    in 0s      `);
        asyncCallback(``);
        asyncCallback(`2026-06-27 13:00:00 (45.3 MB/s) - ‘index.html’ saved [1048/1048]`);
      }
    };
  }

  // 13. top / ps commands
  if (cmd === 'top') {
    return [
      'top - 13:00:00 up 1:45,  1 user,  load average: 0.08, 0.04, 0.01',
      'Tasks:   4 total,   1 running,   3 sleeping,   0 stopped,   0 zombie',
      '%Cpu(s):  1.5 us,  0.5 sy,  0.0 ni, 98.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st',
      'MiB Mem :   9472.0 total,   3945.0 free,   5527.0 used,      0.0 buff/cache',
      'MiB Swap:   2048.0 total,   2048.0 free,      0.0 used.   3945.0 avail Mem ',
      '',
      '    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND',
      '      1 rohit     20   0   18404   3452   2900 S   0.0   0.0   0:00.12 init-shield',
      '     10 rohit     20   0   24560   8912   4500 S   0.5   0.1   0:02.45 packet-sniff-daemon',
      '     15 rohit     20   0   12450   4120   3100 S   0.0   0.0   0:00.08 bash',
      '     32 rohit     20   0   15640   2156   1500 R   1.2   0.0   0:00.02 top'
    ];
  }
  if (cmd === 'ps') {
    return [
      '    PID TTY          TIME CMD',
      '      1 ?        00:00:12 init-shield',
      '     10 ?        00:02:45 packet-sniff-daemon',
      '     15 pts/0    00:00:00 bash',
      '     45 pts/0    00:00:00 ps'
    ];
  }

  // 14. df / free commands
  if (cmd === 'df') {
    return [
      'Filesystem     1K-blocks    Used Available Use% Mounted on',
      '/dev/sda1       51200000 8940250  42259750  18% /',
      'tmpfs            4194304       0   4194304   0% /dev/shm',
      '/dev/sdb1      102400000 1204850 101195150   2% /home/rohit/cyber-sec-deck'
    ];
  }
  if (cmd === 'free') {
    return [
      '              total        used        free      shared  buff/cache   available',
      'Mem:        9699328     5659648     4039680           0           0     4039680',
      'Swap:       2097152           0     2097152'
    ];
  }

  // 15. mkdir / touch / rm mock commands
  if (cmd === 'mkdir') {
    if (!args[0]) return ['mkdir: missing operand'];
    return [`mkdir: cannot create directory ‘${args[0]}’: Read-only file system`];
  }
  if (cmd === 'touch') {
    if (!args[0]) return ['touch: missing file operand'];
    return [`touch: cannot touch ‘${args[0]}’: Read-only file system`];
  }
  if (cmd === 'rm') {
    if (!args[0]) return ['rm: missing operand'];
    return [`rm: cannot remove ‘${args[0]}’: Read-only file system`];
  }

  // 16. Standard project command lookup (fallback)
  if (terminalCommands[cmd]) {
    return terminalCommands[cmd](asyncCallback);
  }

  return null;
};

const runHackSimulation = (logCallback) => {
  const steps = [
    { text: 'Initializing network penetration sequence...', delay: 300 },
    { text: 'Tracing route to target gateway [192.168.1.1]...', delay: 500 },
    { text: 'Running ARP broadcast for active MAC discovery...', delay: 700 },
    { text: 'Detected open ports: 22 (SSH), 80 (HTTP), 443 (HTTPS), 3306 (MySQL)', delay: 600 },
    { text: 'Vulnerability found: CVE-2026-X404 (Unauthenticated Remote Code Execution)', delay: 800 },
    { text: 'Injecting custom payload via port 8080...', delay: 600 },
    { text: 'Payload deployed! Attempting shell connection...', delay: 900 },
    { text: 'CONNECTION GRANTED: root@target-system:~#', delay: 400 },
    { text: 'Extracting secure flags... [■■■■■■■■■■] 100%', delay: 700 },
    { text: 'SUCCESS: FLAG_ACCESS_GRANTED{R0h1t_Sh4rm4_S3cur1ty_N1nj4}', delay: 300 },
  ];

  let step = 0;
  const executeStep = () => {
    if (step < steps.length) {
      logCallback(steps[step].text);
      const delay = steps[step].delay;
      step++;
      setTimeout(executeStep, delay);
    }
  };
  executeStep();
};
