// Hardcoded credentials
const USERS = {
    'admin': { password: 'password', name: 'Admin User', role: 'Admin' },
    'user': { password: 'user123', name: 'Club Member', role: 'Developer' },
    'Ojasva': { password: 'ok123', name: 'Club Member', role: 'Developer' },
    'Vatsal': { password: 'vs123', name: 'Club Member', role: 'Developer' },
    'Harshit': { password: 'hl123', name: 'Club Member', role: 'Developer' },
    'Dinesh': { password: 'ds123', name: 'Club Member', role: 'Developer' }
};

// Sample data
let currentUser = null;

let projects = [
    {
        id: 1,
        name: 'Solana Defi POrtfolio',
        description: 'A sophisticated dynamic portfolio rebalancing system built on Solana that automatically adjusts rebalancing thresholds based on market volatility conditions. ',
        author: 'Rudransh Shinghal',
        tech: ['Rust','Typescript','JavaScript'],
        github: 'https://github.com/Ansh1902396/portfolio-rebalancer',
        
    },
    {
        id: 2,
        name: 'Clanker Dex',
        description: 'A modern decentralized exchange (DEX) dashboard built for trading Clanker tokens on Uniswap V4.',
        author: 'Rudransh Shinghal',
        tech: ['Typescript','JavaScript','CSS'],
        github: 'https://github.com/Ansh1902396/Clanker-Dex',
        
    },
    {
        id: 3,
        name: 'N3 - Nuclei for Web3',
        description: 'Template-Based Security Scanner for Smart Contracts & DApps',
        author: 'K Arya Sekhar Das',
        tech: ['TypeScript','Solidity','JavaScript','Shell'],
        github: 'https://github.com/intelligent-ears/N3',
        
    },
    {
        id: 4,
        name: 'CrypX - Modular Cryptanalysis Framework',
        description: 'CrypX is a web-based cryptanalysis framework that allows users to analyze custom block cipher implementations',
        author: 'K Arya Sekhar Das',
        tech: ['Python'],
        github: 'https://github.com/intelligent-ears/CrypX',
        
    },
    {
        id: 5,
        name: 'SolSniffer ',
        description: 'SolSniffer is a static analysis tool for Solidity smart contracts, built in Python.',
        author: 'K Arya Sekhar Das',
        tech: ['python','Solidity','JavaScript'],
        github: 'https://github.com/intelligent-ears/SolSniffer',
        
    },
    {
        id: 6,
        name: 'Web_Pen_Tool_FSE',
        description: 'A command-line tool for web penetration testing including brute-force login, directory fuzzing, sub-domain discovery, and XSS detection.',
        author: 'Devarsh Parmar',
        tech: ['Python'],
        github: 'https://github.com/DEVMYTH123/Web_Pen_Tool_FSE',
        
    },
    {
        id: 7,
        name: 'Smart-Vending-Machine',
        description: 'An IoT-enabled vending machine using Arduino Mega, ZigBee, RFID and sensors to automate item dispensing and update owner/customer data in real time',
        author: 'Parth Garg',
        tech: ['C++','JavaScript','HTML'],
        github: 'https://github.com/parthgarg351/Smart-Vending-Machine',
        
    },
    {
        id: 8,
        name: 'Smart-table-Clock',
        description: 'A microcontroller-based smart clock that displays time digitally and integrates additional features like alarms, sensors, or automation to function as an enhanced table-top utility device.',
        author: 'Parth Garg',
        tech: ['C++','JavaScript'],
        github: 'https://github.com/parthgarg351/Smart-Table-Clock',
        
    },
    {
        id: 9,
        name: 'd8n',
        description: 'A no-code builder for DeFi workflows allowing users to visually design, automate and execute complex on-chain logic without writing code.',
        author: 'Lakshya Jain',
        tech: ['JavaScript', 'TypeScript'],
        github: 'https://github.com/projectman14/d8n',
        
    },
    {
        id: 10,
        name: 'Chainlink price Predictor',
        description: 'A Python-based project that uses historical price data from Chainlink oracle feeds and combines neural networks (RNN, LSTM, GRU) with LLM-generated custom loss functions to predict Ethereum (ETH) prices.',
        author: 'Siddhartha Swarnkar',
        tech: ['Python'],
        github: 'https://github.com/bismuth01/chainlink-price-predictor',
        
    },
    {
        id: 11,
        name: 'Puch AI Virtual Pet',
        description: 'A virtual pet application powered by the Puch AI framework that allows users to interact with, care for, and play with an AI-driven pet whose behaviours adapt over time.',
        author: 'Siddhartha Swarnkar',
        tech: ['Python'],
        github: 'https://github.com/bismuth01/puch-ai-virtual-pet',
        
    },
    {
        id: 12,
        name: 'rpg-verse-agentic',
        description: 'A hackathon-winning “AI-powered multiverse” project that blends MMORPG mechanics with Web3 technologies—creating an immersive agentic universe where players, AI agents, and blockchain elements interact.',
        author: 'Harshit Nayan',
        tech: ['JavaScript', 'TypeScript','Vue'],
        github: 'https://github.com/LogicalGuy77/rpg-verse-agentic',
        
    },
    {
        id: 13,
        name: 'tokenyzer',
        description: 'A utility tool designed to analyze and manipulate tokens—likely for blockchain assets or smart-contract workflows—facilitating deeper insight and management of token interactions.',
        author: 'Harshit Nayan',
        tech: ['JavaScript', 'HTML','CSS','Solidity'],
        github: 'https://github.com/LogicalGuy77/tokenyzer',
        
    },
    {
        id: 14,
        name: 'memory-frontend-faff',
        description: 'A front-end project for a “memory” (or recall)-oriented interface/game, focusing on a layered structure of Experience → Logic → Memory → Growth.',
        author: 'Harshit Nayan',
        tech: ['JavaScript'],
        github: 'https://github.com/LogicalGuy77/memory-frontend-faff',
        
    },
    {
        id: 15,
        name: 'memecoin-agent-frontend',
        description: 'A frontend application for an AI agent that analyzes memecoin market data, adapts to changing conditions, and provides real-time insights using large language models.',
        author: 'Harshit Nayan',
        tech: ['JavaScript','CSS','HTML'],
        github: 'https://github.com/LogicalGuy77/memecoin-agent-frontend',
        
    },
    {
        id: 16,
        name: 'weekendly-atlan',
        description: 'A weekend-activity planner app featuring a drag-and-drop interface, real-time weather insights, and AI-generated shareable visuals of your itinerary.',
        author: 'Harshit Nayan',
        tech: ['JavaScript','TypeScript','HTML','CSS'],
        github: 'https://github.com/LogicalGuy77/weekendly-atlan',
        
    },
    {
        id: 17,
        name: 'BlockStay',
        description: 'A blockchain-powered platform that enables AI-driven booking of stays and accommodations using crypto payments and decentralized technology.',
        author: 'Manan Singhal',
        tech: ['JavaScript','TypeScript','Move'],
        github: 'https://github.com/MananSinghal123/BlockStay',
        
    },
    {
        id: 18,
        name: 'eth-api-payments',
        description: 'A backend service designed to facilitate Ethereum-based payments via an API, enabling applications to initiate, track, and manage crypto transactions programmatically.',
        author: 'Manan Singhal',
        tech: ['JavaScript','TypeScript','Rust','Solidity','CSS','Docker'],
        github: 'https://github.com/MananSinghal123/eth-api-payments',
        
    },
    {
        id: 19,
        name: 'BTCShield',
        description: 'A DeFi platform for BTC lending and borrowing that employs a three-phase backstop mechanism using reversible call options to reduce liquidation risk and support institutional-grade positions.',
        author: 'Manan Singhal',
        tech: ['TypeScript','JavaScript','CSS'],
        github: 'https://github.com/MananSinghal123/BTCShield',
        
    },
    {
        id: 20,
        name: 'Education Agent',
        description: 'An AI-powered educational assistant aimed at optimising learning experiences through intelligent agent-driven tutoring and resource recommendations',
        author: 'Ayush Petwal',
        tech: ['TypeScript','JavaScript','CSS','Shell','Cadence'],
        github: 'https://github.com/1Ayush-Petwal/Education-Agent',
        
    },
    {
        id: 21,
        name: 'CitreaMesh',
        description: 'A Model-Context-Protocol (MCP) server for the Citrea testnet that lets LLM-based assistants perform on-chain actions like wallet balance checks, faucet claims, ERC-20 token deployment, transfers and wallet',
        author: 'Ayush Petwal',
        tech: ['TypeScript','JavaScript',],
        github: 'https://github.com/1Ayush-Petwal/CitreaMesh',
        
    },
    {
        id: 22,
        name: 'X-Bid: Cross-Chain NFT Auction Platform',
        description: 'Decentralized cross-chain NFT auction platform (X-Bid). Sellers set intent (preferred chain/token); bidders from other chains can participate. Uses Avail Nexus SDK for cross-chain interoperability and automates bridging, swapping and settlement.',
        author: 'Arijit Roy , Vaibhav Goyal , KAvish ',
        tech: ['TypeScript','Solidity'],
        github: 'https://github.com/arijitroy667/auction_cc',
    
    },
    {
        id: 23,
        name: 'Stargazer',
        description: 'Modern social media web application for posting, discovering content and connecting users. Frontend/back-end web app for sharing and engagement.',
        author: 'Arijit Roy',
        tech: ['TypeScript','CSS',],
        github: 'https://github.com/arijitroy667/stargazer-social-galaxy',
        
    },
    {
        id: 24,
        name: 'Vaultopia - ERC-4626 DeFi Vault',
        description: 'Modular, upgradeable DeFi vault for USDC implementing ERC-4626. Supports yield strategies (e.g., Lido staking), uses Diamond Standard (ERC-2535) for modularity, and offers liquidity management (partial liquid / partial locked) for yield generation.',
        author: 'Arijit Roy',
        tech: ['TypeScript','CSS','Solidity','JavaScript'],
        github: 'https://github.com/arijitroy667/Vaultopia',
        
    },
    {
        id: 25,
        name: 'NebulaDAo',
        description: 'Simple DAO implementation for creating and executing proposals on EVM chains. Implements governance primitives to propose, vote and execute on-chain actions.',
        author: 'Arijit Roy',
        tech: ['TypeScript','JavaScript','Solidity','CSS'],
        github: 'https://github.com/arijitroy667/NebulaDAO',
        
    },
    {
        id: 26,
        name: 'Currency- Exchanger ',
        description: 'A lightweight web app to view currency exchange rates globally. Likely fetches rates from an API and displays conversion results and rates for requested currencies.',
        author: 'Vaibhav Rawat',
        tech: ['JavaScript','CSS','HTML'],
        github: 'https://github.com/Vaibhav-Rawat-cipher/Currency-Exchanger',
        
    },
    {
        id: 27,
        name: 'sui_counter',
        description: 'Small Sui blockchain example project — a counter app demonstrating basic interactions with Sui (likely for learning/quick demo purposes).',
        author: 'manas hatwar',
        tech: ['Move','TypeScript','HTML'],
        github: 'https://github.com/manashatwar/sui_counter',
        
    },
    {
        id: 28,
        name: 'VigilBot',
        description: 'Blockchain-based system to detect and categorize trading bots using real-time price feeds (Pyth). Analyzes trading patterns and reaction times to classify actors (human / good bot / bad bot) and flag suspicious automated behavior.',
        author: 'Rudra Bhaskar',
        tech: ['JavaScript','TypeScript','HTML','CSS','Solidity','Shell'],
        github: 'https://github.com/RudraBhaskar9439/VigilBot',
        
    },
    {
        id: 29,
        name: 'Rehypothecation_UniswapV4_Hook',
        description: 'Smart-contract prototype integrating with Uniswap V4 hooks to enable rehypothecation patterns — reusing collateral/liquidity via hooks. Contains contract code and example integrations for Uniswap V4.',
        author: 'Rudra Bhaskar',
        tech: ['Solidity'],
        github: 'https://github.com/RudraBhaskar9439/Rehypothecation_UniswapV4_Hook',
        
    },
    {
        id: 30,
        name: 'Machine Learning Data Illustrator',
        description: 'Streamlit-based ML web application for building, training and evaluating models through an interactive UI. Supports dataset upload, model selection, training and visualization of results/metrics.',
        author: 'Rudra Bhaskar',
        tech: ['Python','Shell'],
        github: 'https://github.com/RudraBhaskar9439/Machine_Learning_Data_Illustrator',
        
    },
    {
        id: 31,
        name: 'BlockChain_Drive (ChainDrive)',
        description: 'DApp for uploading files/images to IPFS and sharing access with Ethereum addresses. Uses smart contracts for access control and Pinata/IPFS for storage; users can upload, view and share securely on-chain.',
        author: 'Rudra Bhaskar',
        tech: ['JavaScript','HTML','CSS','Solidity'],
        github: 'https://github.com/RudraBhaskar9439/BlockChain_Drive',
        
    },
    {
        id: 31,
        name: 'INVOx',
        description: 'INVOx — repository with frontend/backend tooling (README limited). Likely a web app; README not present or minimal, so summary inferred from code structure and files.',
        author: 'Vaibhav Goyal',
        tech: ['JavaScript','Solidity'],
        github: 'https://github.com/viscous-236/INVOx',
        
    },
    {
        id: 32,
        name: 'chromion-chainlink',
        description: 'Integration project linking Chromion (or similar) components with Chainlink — likely demonstrating or implementing Chainlink oracle integrations for a dApp.',
        author: 'Vaibhav Goyal',
        tech: ['Solidity','Python'],
        github: 'https://github.com/viscous-236/chromion-chainlink',
        
    },
    {
        id: 33,
        name: 'AgriSchield',
        description: 'Integration project linking Chromion (or similar) components with Chainlink — likely demonstrating or implementing Chainlink oracle integrations for a dApp.',
        author: 'Kavish',
        tech: ['JavaScript'],
        github: 'https://github.com/Kavish-12345/AgriSchield-',
        
    },
    {
        id: 34,
        name: 'Medical Dashboard',
        description: 'ETHGlobal final project — a healthcare/medical dashboard combining modern UI/UX with blockchain integration for patient or data management and visualization.',
        author: 'Komal Jeengar',
        tech: ['TypeScript','Solidity','CSS'],
        github: 'https://github.com/komaljeengar/ethglobal-final-project',
        
    },
    {
        id: 35,
        name: 'carpool-lnmiit-work-new',
        description: 'Carpooling application/work-in-progress repository (frontend/backend). README minimal; inferred to be a ride-sharing/carpool coordination app for LNMIIT community.',
        author: 'Amrendra Singh',
        tech: ['TypeScript'],
        github: 'https://github.com/AmrendraTheCoder/carpool-lnmiit-work-new',
        
    },
    {
        id: 36,
        name: 'justfortheETH (MediBOX)',
        description: 'Complete MediBOX platform — blockchain-based medical platform with tokenization, DeFi features and cross-chain ideas (project README indicates healthcare/DeFi integration).',
        author: 'Amrendra Singh',
        tech: ['TypeScript','Solidity','Shell','Go','JavaScript','PLpgSQL'],
        github: 'https://github.com/AmrendraTheCoder/justfortheETH',
        
    },
    {
        id: 37,
        name: 'zk-mail',
        description: 'Zero-knowledge enabled mail/reputation tooling (inferred). Repo contains reputation-engine and related modules; summary inferred from folder names and code structure.',
        author: 'Sushmit',
        tech: ['TypeScript','JavaScript','HTML','CSS','Rust','Shell'],
        github: 'https://github.com/Sushmit94/zk-mail',
        
    },
    {
        id: 38,
        name: 'AgriSchield_contracts',
        description: 'Smart contracts for the AgriSchield project — contains Solidity contracts and deployment scripts to manage agriculture-related on-chain logic.',
        author: 'Sushmit',
        tech: ['JavaScript','Solidity','Python','Ruby'],
        github: 'https://github.com/Sushmit94/AgriSchield_contracts',
        
    },
    {
        id: 39,
        name: 'sheet-ai-pro-backup',
        description: 'Backup repo for Sheet AI project — includes guides (CELL-FORMATTING-GUIDE.md) and tooling for spreadsheet automation; README limited.',
        author: 'Arpit Mishra',
        tech: ['javaScript','CSS','PLpgSQL'],
        github: 'https://github.com/arpitmisra/sheet-ai-pro-backup',
        
    },
    {
        id: 40,
        name: 'EnvioScout AI',
        description: 'AI-powered blockchain analytics assistant using Envio HyperSync indexing, Google Gemini AI and Blockscout REST API to answer natural-language queries about transactions, gas fees, block times and network statistics across EVM chains.',
        author: 'Arpit Mishra',
        tech: ['JavaScript','CSS','HTML'],
        github: 'https://github.com/arpitmisra/envioscout-ai',

    }
];

let ideas = [
    
];

// DOM Elements - will be initialized when DOM is ready
let loginScreen, mainApp, loginForm, logoutBtn, currentUserSpan, profileNameSpan;
let navBtns, tabContents;
let projectModal, ideaModal, ideaDetailModal;
let addProjectBtn, addIdeaBtn;
let projectForm, ideaForm, commentForm;
let projectsGrid, ideasList;
let currentIdeaId = null;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
    console.log('🎮 DevBit Forum loading...');
    
    // Initialize DOM Elements
    loginScreen = document.getElementById('loginScreen');
    mainApp = document.getElementById('mainApp');
    loginForm = document.getElementById('loginForm');
    logoutBtn = document.getElementById('logoutBtn');
    currentUserSpan = document.getElementById('currentUser');
    profileNameSpan = document.getElementById('profileName');
    
    navBtns = document.querySelectorAll('.nav-btn');
    tabContents = document.querySelectorAll('.tab-content');
    
    projectModal = document.getElementById('projectModal');
    ideaModal = document.getElementById('ideaModal');
    ideaDetailModal = document.getElementById('ideaDetailModal');
    
    addProjectBtn = document.getElementById('addProjectBtn');
    addIdeaBtn = document.getElementById('addIdeaBtn');
    
    projectForm = document.getElementById('projectForm');
    ideaForm = document.getElementById('ideaForm');
    commentForm = document.getElementById('commentForm');
    
    projectsGrid = document.getElementById('projectsGrid');
    ideasList = document.getElementById('ideasList');
    
    console.log('✅ DOM elements loaded');
    console.log('🔐 Test credentials: admin/password or user/user123');
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize content
    renderProjects();
    renderIdeas();
    
    // Setup author filter
    setupAuthorFilter();
    
    // Setup author filter change event
    document.getElementById('authorFilter').addEventListener('change', renderProjects);
    
    // Setup category filter change event
    document.getElementById('categoryFilter').addEventListener('change', renderIdeas);
    
    // Add shake animation style
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
    `;
    document.head.appendChild(style);
    
    console.log('🎉 DevBit Forum ready!');
}

function setupEventListeners() {
    // Login functionality
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        console.log('🔑 Login attempt:', username);
        
        if (USERS[username] && USERS[username].password === password) {
            currentUser = {
                username: username,
                ...USERS[username]
            };
            
            console.log('✅ Login successful!', currentUser);
            console.log('Switching screens...');
            
            // Switch to main app immediately
            loginScreen.classList.remove('active');
            mainApp.classList.add('active');
            currentUserSpan.textContent = currentUser.name;
            profileNameSpan.textContent = currentUser.name;
            
            console.log('Login screen active:', loginScreen.classList.contains('active'));
            console.log('Main app active:', mainApp.classList.contains('active'));
            
            renderProjects();
            renderIdeas();
            
            console.log('✨ Switched to main app!');
        } else {
            console.log('❌ Login failed for username:', username);
            // Shake animation for wrong credentials
            loginForm.style.animation = 'shake 0.5s';
            setTimeout(() => {
                loginForm.style.animation = '';
            }, 500);
            alert('Invalid credentials! Try: admin/password or user/user123');
        }
    });
    
    // Logout
    logoutBtn.addEventListener('click', () => {
        currentUser = null;
        mainApp.classList.remove('active');
        loginScreen.classList.add('active');
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    });
    
    // Tab navigation
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;
            
            // Update active states
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            tabContents.forEach(tab => tab.classList.remove('active'));
            document.getElementById(`${tabName}Tab`).classList.add('active');
        });
    });
    
    // Modal controls
    const closeBtns = document.querySelectorAll('.close-btn');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal').classList.remove('active');
        });
    });
    
    // Click outside modal to close
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    // Add project button
    addProjectBtn.addEventListener('click', () => {
        projectModal.classList.add('active');
    });
    
    // Add idea button
    addIdeaBtn.addEventListener('click', () => {
        ideaModal.classList.add('active');
    });
    
    // Project form submit
    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newProject = {
            id: projects.length + 1,
            name: document.getElementById('projectName').value,
            description: document.getElementById('projectDesc').value,
            author: currentUser.name,
            tech: document.getElementById('projectTech').value.split(',').map(t => t.trim()),
            github: document.getElementById('projectGithub').value || '#',
            likes: 0
        };
        
        projects.unshift(newProject);
        renderProjects();
        projectModal.classList.remove('active');
        projectForm.reset();
        
        showNotification('Project added successfully! ⚡');
    });
    
    // Idea form submit
    ideaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newIdea = {
            id: ideas.length + 1,
            title: document.getElementById('ideaTitle').value,
            description: document.getElementById('ideaDesc').value,
            author: currentUser.name,
            category: document.getElementById('ideaCategory').value,
            comments: [],
            votes: 0,
            date: new Date().toISOString().split('T')[0]
        };
        
        ideas.unshift(newIdea);
        renderIdeas();
        ideaModal.classList.remove('active');
        ideaForm.reset();
        
        showNotification('Idea posted successfully! 💡');
    });
    
    // Comment form submit
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const commentText = document.getElementById('commentText').value;
        const idea = ideas.find(i => i.id === currentIdeaId);
        
        const newComment = {
            author: currentUser.name,
            text: commentText,
            date: new Date().toISOString().split('T')[0]
        };
        
        idea.comments.push(newComment);
        renderComments(idea.comments);
        renderIdeas();
        document.getElementById('commentText').value = '';
        
        showNotification('Comment posted! 💬');
    });
    
    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            document.body.style.animation = 'rainbow 2s linear infinite';
            showNotification('🎮 CHEAT CODE ACTIVATED! 🎮');
            
            const rainbowStyle = document.createElement('style');
            rainbowStyle.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(rainbowStyle);
            
            setTimeout(() => {
                document.body.style.animation = '';
            }, 10000);
        }
    });
}

// Setup author filter
function setupAuthorFilter() {
    // Get unique authors
    const authors = [...new Set(projects.map(p => p.author))].sort();
    console.log('🔍 setupAuthorFilter called');
    console.log('📊 Total projects:', projects.length);
    console.log('✍️ Available authors:', authors);
    
    const select = document.getElementById('authorFilter');
    console.log('🎯 Select element found:', !!select);
    
    if (!select) {
        console.error('❌ Author filter select element not found!');
        return;
    }
    
    // Clear existing options except the first one
    console.log('🗑️ Clearing options, current count:', select.options.length);
    while (select.options.length > 1) {
        select.remove(1);
    }
    
    // Add author options
    authors.forEach(author => {
        const option = document.createElement('option');
        option.value = author;
        option.textContent = author;
        select.appendChild(option);
        console.log('➕ Added option:', author);
    });
    
    console.log('✅ Author filter populated with', authors.length, 'authors');
    console.log('📝 Final select options count:', select.options.length);
}

// Render projects
function renderProjects() {
    const selectedAuthor = document.getElementById('authorFilter')?.value || 'all';
    
    let filteredProjects = projects;
    if (selectedAuthor !== 'all') {
        filteredProjects = projects.filter(project => project.author === selectedAuthor);
    }
    
    projectsGrid.innerHTML = filteredProjects.map(project => `
        <div class="project-card pixel-border">
            <div class="project-header">
                <div>
                    <h3>${project.name}</h3>
                    <span class="project-author">By ${project.author}</span>
                </div>
            </div>
            <p>${project.description}</p>
            <div class="tech-tags">
                ${project.tech.map(tech => `<span class="tag">${tech}</span>`).join('')}
            </div>
            <div class="project-footer">
                <a href="${project.github}" class="project-link" target="_blank">→ Source Code</a>
            </div>
        </div>
    `).join('');
}

// Render ideas
function renderIdeas() {
    const selectedCategory = document.getElementById('categoryFilter')?.value || 'all';
    
    let filteredIdeas = ideas;
    if (selectedCategory !== 'all') {
        filteredIdeas = ideas.filter(idea => idea.category === selectedCategory);
    }
    
    ideasList.innerHTML = filteredIdeas.map(idea => `
        <div class="idea-card pixel-border" onclick="openIdeaDetail(${idea.id})">
            <div class="idea-header">
                <div class="idea-title">
                    <h3>${idea.title}</h3>
                    <span class="idea-meta">Posted by ${idea.author} • ${idea.date}</span>
                </div>
                <span class="category-badge">${getCategoryName(idea.category)}</span>
            </div>
            <p>${idea.description}</p>
            <div class="idea-stats">
                <span class="stat-item">▲ ${idea.votes} votes</span>
                <span class="stat-item">💬 ${idea.comments.length} comments</span>
            </div>
        </div>
    `).join('');
}

// Category names
function getCategoryName(category) {
    const names = {
        'web': 'Web Dev',
        'mobile': 'Mobile',
        'ai': 'AI/ML',
        'game': 'Game Dev',
        'other': 'Other'
    };
    return names[category] || category;
}

// Open idea detail
function openIdeaDetail(ideaId) {
    currentIdeaId = ideaId;
    const idea = ideas.find(i => i.id === ideaId);
    
    document.getElementById('ideaDetailTitle').textContent = idea.title;
    document.getElementById('ideaDetailContent').innerHTML = `
        <div style="margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 15px; flex-wrap: wrap; gap: 10px;">
                <span class="idea-meta">Posted by ${idea.author} • ${idea.date}</span>
                <span class="category-badge">${getCategoryName(idea.category)}</span>
            </div>
            <p style="font-size: 0.7rem; line-height: 1.8; color: #ccc;">${idea.description}</p>
            <div class="idea-stats" style="margin-top: 15px;">
                <span class="stat-item">▲ ${idea.votes} votes</span>
            </div>
        </div>
    `;
    
    renderComments(idea.comments);
    ideaDetailModal.classList.add('active');
}

// Render comments
function renderComments(comments) {
    const commentsList = document.getElementById('commentsList');
    
    if (comments.length === 0) {
        commentsList.innerHTML = '<p style="font-size: 0.6rem; color: #888; text-align: center; padding: 20px;">No comments yet. Be the first to comment!</p>';
    } else {
        commentsList.innerHTML = comments.map(comment => `
            <div class="comment">
                <div class="comment-header">
                    <span class="comment-author">${comment.author}</span>
                    <span class="comment-date">${comment.date}</span>
                </div>
                <p class="comment-text">${comment.text}</p>
            </div>
        `).join('');
    }
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary);
        color: var(--bg-dark);
        padding: 15px 25px;
        border: 3px solid var(--primary);
        font-family: 'Press Start 2P', cursive;
        font-size: 0.7rem;
        z-index: 10000;
        animation: slideInRight 0.5s ease-out;
        box-shadow: 0 0 30px var(--shadow);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-in';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Animation for notifications
const notifStyle = document.createElement('style');
notifStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notifStyle);
