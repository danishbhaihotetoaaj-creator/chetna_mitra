# Chetna Mitra - AI Chat Assistant

A modern, feature-rich AI chat application built with Next.js 14, React 18, and TailwindCSS. Features include voice input, file sharing, web search integration, and a beautiful dark theme UI.

## ✨ Features

### 🎤 Voice Input & Output
- **Web Speech API Integration**: Real-time speech recognition and synthesis
- **Multi-language Support**: Configurable language settings
- **Voice Commands**: Start/stop recording with visual feedback
- **Transcript Preview**: See your speech before sending

### 📁 File Management
- **Drag & Drop Upload**: Support for images, audio, PDFs, and text files
- **Instant Previews**: Image thumbnails and file information
- **Multiple File Types**: Images, audio, documents, and more
- **File Size Limits**: Configurable upload restrictions

### 🔍 Web Search Integration
- **AI-Powered Search**: GPT-4o Mini integration for intelligent results
- **Real-time Results**: Live search with loading indicators
- **Rich Preview**: Title, snippet, and source information
- **External Links**: Open search results in new tabs

### ✨ Prompt Enhancement
- **Smart Suggestions**: AI-powered prompt improvement options
- **Multiple Styles**: Professional, casual, detailed, concise, and creative
- **Custom Combinations**: Mix and match enhancement styles
- **Instant Application**: Apply enhancements directly to your messages

### 💬 Chat Features
- **Real-time Messaging**: WebSocket integration for instant updates
- **Message Reactions**: Like, reply, and share options
- **Typing Indicators**: Visual feedback during AI responses
- **Message History**: Persistent conversation storage
- **Search & Filter**: Find conversations quickly

### 🎨 Modern UI/UX
- **Dark Theme**: Beautiful dark mode with accent colors
- **Responsive Design**: Mobile-first, tablet, and desktop optimized
- **Smooth Animations**: Framer Motion powered transitions
- **Glass Effects**: Modern backdrop blur and transparency
- **Custom Scrollbars**: Styled scrollbars for better aesthetics

### 🔒 Privacy & Compliance
- **GDPR Compliant**: Cookie consent management
- **Privacy Controls**: Granular permission settings
- **Secure Storage**: Local storage with encryption options
- **Permission Prompts**: Microphone and camera access controls

### 🌍 Internationalization
- **Multi-language Support**: Ready for localization
- **Regional Versions**: India, Germany, Russia support
- **Cultural Adaptations**: Region-specific UI elements

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern browser with Web Speech API support

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chetna-mitra
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your configuration:
   ```env
   NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js 14 app directory
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main chat interface
│   ├── globals.css        # Global styles and Tailwind
│   └── providers.tsx      # Context providers
├── components/            # Reusable UI components
│   ├── ChatInterface.tsx  # Main chat component
│   ├── MessageList.tsx    # Message display
│   ├── MessageBubble.tsx  # Individual message
│   ├── VoiceInput.tsx     # Voice recognition
│   ├── FileUploader.tsx   # File upload handling
│   ├── WebSearchButton.tsx # Web search integration
│   ├── PromptEnhancer.tsx # AI prompt improvement
│   ├── CookieConsent.tsx  # Privacy compliance
│   ├── Header.tsx         # Navigation header
│   ├── Sidebar.tsx        # Chat sidebar
│   └── TypingIndicator.tsx # AI typing animation
├── contexts/              # React Context providers
│   ├── ChatContext.tsx    # Chat state management
│   ├── SocketContext.tsx  # WebSocket handling
│   └── ThemeContext.tsx   # Theme management
└── utils/                 # Utility functions
```

## 🛠️ Technology Stack

### Frontend
- **Next.js 14**: React framework with app router
- **React 18**: Latest React with concurrent features
- **TypeScript**: Type-safe development
- **TailwindCSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions

### State Management
- **React Context**: Component state sharing
- **Zustand**: Lightweight state management
- **WebSocket**: Real-time communication

### UI Components
- **Lucide React**: Beautiful icon library
- **React Dropzone**: File upload handling
- **React Hot Toast**: Notification system
- **Date-fns**: Date manipulation utilities

### Development Tools
- **ESLint**: Code quality and consistency
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## 🔧 Configuration

### TailwindCSS
The project uses a custom Tailwind configuration with:
- Dark theme support
- Custom color palette
- Animation utilities
- Responsive breakpoints

### Environment Variables
```env
# Socket.io server URL
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001

# API endpoint
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Feature flags
NEXT_PUBLIC_ENABLE_VOICE=true
NEXT_PUBLIC_ENABLE_FILE_UPLOAD=true
NEXT_PUBLIC_ENABLE_WEB_SEARCH=true
```

## 📱 Responsive Design

The application is built with a mobile-first approach:
- **Mobile**: Optimized touch interactions
- **Tablet**: Adaptive layouts and navigation
- **Desktop**: Full-featured interface with sidebar

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔒 Privacy Features

- **Cookie Management**: Granular control over cookie types
- **Permission Handling**: Explicit microphone and camera access
- **Data Localization**: Region-specific data handling
- **Encryption**: Secure storage of sensitive information

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Docker
```bash
docker build -t chetna-mitra .
docker run -p 3000:3000 chetna-mitra
```

### Manual Deployment
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [Wiki](link-to-wiki)
- **Issues**: [GitHub Issues](link-to-issues)
- **Discussions**: [GitHub Discussions](link-to-discussions)
- **Email**: support@chetnamitra.com

## 🙏 Acknowledgments

- OpenAI for GPT-4o Mini integration
- Vercel for Next.js framework
- TailwindCSS team for the amazing CSS framework
- Framer team for motion library
- All contributors and supporters

---

**Made with ❤️ by the Chetna Mitra Team**