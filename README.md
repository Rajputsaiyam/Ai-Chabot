#  BeyondChats Admin Panel

A responsive chatbot admin panel inspired by Intercom's AI-powered dashboard. This application provides a comprehensive interface for managing customer conversations, with advanced AI-powered features.

![BeyondChats Admin Panel](https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixid=M3w3MjY0NTB8MHwxfHNlYXJjaHwxfHxjaGF0JTIwZGFzaGJvYXJkJTIwdWklMjBtb2Rlcm58ZW58MHx8fHwxNzQ3NjU0ODgzfDA&ixlib=rb-4.1.0&w=1200&h=630&fit=crop)

## Features

### Conversation Management
- Fully functional conversation inbox
- Real-time chat interface with message history
- Typing indicators and AI response simulation
- Message attachments and emoji selector
- Filter conversations by status, assignment, and tags

### User Profile Management
- Detailed user information display
- Conversation history and user activity timeline
- Tag management system
- Internal notes for agents
- Conversation status control (open/close)

### AI & Automation
- AI-generated response suggestions
- Quick reply templates
- Smart filtering and organization
- Automated notifications

### Agent Tools
- Agent assignment
- Call and video chat capabilities
- Internal notes system
- Notification management

### UI/UX
- Responsive design (mobile, tablet, desktop)
- Dark/light mode toggle
- Beautiful animations and transitions
- Intuitive navigation

## Technical Stack

- **React.js** - Frontend framework
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Date-fns** - Date formatting
- **Context API** - State management

## Project Structure

```
beyondchats-admin-panel/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ChatWindow.jsx         # Main chat interface
│   │   ├── Dashboard.jsx          # Main layout component
│   │   ├── IncomingCall.jsx       # Incoming call notification
│   │   ├── MobileHeader.jsx       # Mobile-specific header
│   │   ├── NotificationPanel.jsx  # Notification system
│   │   ├── Sidebar.jsx            # Conversation list sidebar
│   │   └── UserProfile.jsx        # User details panel
│   ├── contexts/
│   │   ├── ConversationContext.jsx # Conversation state management
│   │   └── UiContext.jsx           # UI state management
│   ├── data/
│   │   └── mockData.js             # Sample conversation data
│   ├── App.jsx                     # Root component
│   ├── index.css                   # Global styles
│   └── main.jsx                    # Entry point
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/beyondchats-admin-panel.git
cd beyondchats-admin-panel
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage Guide

### Navigating the Dashboard
- The left sidebar displays all conversations
- The center panel shows the active conversation
- The right panel displays user information and tools

### Managing Conversations
- Click on a conversation in the sidebar to open it
- Use the message input to send responses
- Click the attachment icon to add files
- Use the emoji picker for quick emoji insertion

### Using Agent Tools
- Assign conversations to specific agents
- Add internal notes visible only to team members
- Add tags to categorize conversations
- Close conversations when resolved

### AI Features
- Click on AI suggestions to insert them into your response
- Use quick replies for common responses
- The AI will automatically simulate typing when appropriate

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspired by Intercom's dashboard
- Icons provided by Lucide React
- Sample avatars from Unsplash and DiceBear

---

Built with ❤️ for the BeyondChats assignment