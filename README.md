# Chetna Mitra - Intelligent AI Assistant

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.0-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.6-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Chetna Mitra** is a modern, intelligent AI assistant web application built with React and cutting-edge technologies. It provides an intuitive chat interface with voice input/output capabilities, file processing, and a beautiful, responsive design.

## ✨ Features

### 🤖 Core AI Capabilities
- **Intelligent Chat Interface**: Advanced conversation capabilities with context awareness
- **Voice Input/Output**: Speak to the AI and receive voice responses
- **File Processing**: Upload and analyze documents, images, and various file types
- **Real-time Responses**: Instant AI responses with typing indicators
- **Chat History**: Persistent conversation storage with localStorage

### 🎨 Modern UI/UX
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Beautiful Animations**: Smooth transitions and micro-interactions
- **Dark/Light Theme**: CSS custom properties for theming
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Modern Components**: Reusable UI components with Radix UI

### 🚀 Technical Features
- **React 18**: Latest React features with hooks and modern patterns
- **Vite Build Tool**: Lightning-fast development and build times
- **Redux Toolkit**: State management for complex application state
- **React Router**: Client-side routing with hash links support
- **Error Boundaries**: Graceful error handling and recovery

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - Modern React with hooks and concurrent features
- **Vite 5.0.0** - Next-generation frontend build tool
- **Tailwind CSS 3.4.6** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **Radix UI** - Accessible component primitives

### State Management
- **Redux Toolkit 2.6.1** - Modern Redux with simplified patterns
- **React Hook Form** - Performant forms with validation

### UI Components
- **Lucide React** - Beautiful, customizable icons
- **Class Variance Authority** - Type-safe component variants
- **Tailwind Merge** - Intelligent Tailwind class merging

### Data Visualization
- **D3.js** - Data visualization library
- **Recharts** - Composable charting library

### Utilities
- **Date-fns** - Modern date utility library
- **Axios** - HTTP client for API requests
- **React Helmet** - Document head management

## 📁 Project Structure

```
chetna-mitra/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Base UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── FileUpload.jsx
│   │   │   ├── VoiceInput.jsx
│   │   │   └── VoiceOutput.jsx
│   │   ├── ErrorBoundary.jsx
│   │   └── ScrollToTop.jsx
│   ├── pages/             # Application pages
│   │   ├── landing-page/  # Homepage with hero and features
│   │   ├── chat-interface/ # Main AI chat functionality
│   │   ├── about-page/    # Company information
│   │   ├── feedback-page/ # User feedback system
│   │   ├── privacy-policy/ # Privacy and legal information
│   │   └── NotFound.jsx   # 404 error page
│   ├── styles/            # Global styles and CSS variables
│   ├── utils/             # Utility functions
│   ├── App.jsx            # Main application component
│   ├── Routes.jsx         # Application routing
│   └── index.jsx          # Application entry point
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
├── package.json           # Dependencies and scripts
└── index.html             # HTML template
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/chetna-mitra.git
   cd chetna-mitra
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (Vite default port)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run serve
```

## 🎯 Available Scripts

- **`npm start`** - Start development server with hot reload
- **`npm run build`** - Build for production with source maps
- **`npm run serve`** - Preview production build locally

## 🎨 Customization

### Tailwind CSS Configuration
The project uses a custom Tailwind configuration with:
- **Custom Color Palette**: Semantic color variables
- **Typography Scale**: Fluid typography system
- **Animation System**: Custom keyframes and transitions
- **Component Variants**: Consistent spacing and shadows

### Theme Customization
CSS custom properties are defined in the global styles for easy theming:
- Primary, secondary, and accent colors
- Background and foreground colors
- Border and input styling
- Success, warning, and error states

## 📱 Responsive Design

The application is built with a mobile-first approach:
- **Mobile**: Optimized for small screens (320px+)
- **Tablet**: Responsive layouts for medium screens (768px+)
- **Desktop**: Enhanced experiences for large screens (1024px+)
- **Large Desktop**: Optimized for extra-large screens (1280px+)

## 🔧 Development

### Code Style
- **ESLint**: Configured with React and Jest rules
- **Prettier**: Code formatting (if configured)
- **Component Structure**: Functional components with hooks
- **File Naming**: PascalCase for components, kebab-case for files

### Adding New Features
1. Create components in the appropriate directory
2. Add routes in `src/Routes.jsx`
3. Update navigation components
4. Add necessary state management
5. Test across different screen sizes

### Component Guidelines
- Use TypeScript-like prop validation
- Implement proper error boundaries
- Follow accessibility best practices
- Use Tailwind utility classes consistently
- Implement responsive design patterns

## 🧪 Testing

The project includes testing setup with:
- **Jest**: Testing framework
- **React Testing Library**: Component testing utilities
- **User Event**: User interaction simulation

Run tests with:
```bash
npm test
```

## 📦 Dependencies

### Critical Dependencies (DO NOT REMOVE)
These dependencies are marked as critical in `package.json`:
- `@dhiwise/component-tagger` - Component tagging system
- `react` & `react-dom` - Core React library
- `@reduxjs/toolkit` & `redux` - State management
- `react-router-dom` - Client-side routing

### Development Dependencies
- **Build Tools**: Vite, PostCSS, Autoprefixer
- **CSS Framework**: Tailwind CSS with plugins
- **Testing**: Jest, React Testing Library

## 🌐 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- **Email**: support@chetnamitra.com
- **Documentation**: [docs.chetnamitra.com](https://docs.chetnamitra.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/chetna-mitra/issues)

## 🙏 Acknowledgments

- **Dhiwise** for the component generation system
- **Tailwind CSS** team for the amazing utility framework
- **React** community for continuous improvements
- **Vite** team for the blazing-fast build tool

---

**Built with ❤️ using modern web technologies**