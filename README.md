# Quiz Platform

A modern, interactive quiz application built with React and Supabase. Test your knowledge across various subjects with timed questions, track your progress, and review your performance history.


## ✨ Features

- 🎯 Multiple choice and integer-based questions
- ⏱️ Timed questions (30 seconds per question)
- 🔄 Randomized question order for each attempt
- 📊 Real-time progress tracking
- 📱 Responsive design for all devices
- 🔍 Detailed performance analytics
- 📜 Complete attempt history
- 🔐 User authentication and data persistence

## 🚀 Tech Stack

- **Frontend**: React 18 with TypeScript
- **State Management**: Zustand
- **Styling**: TailwindCSS
- **Database**: Supabase
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- A Supabase account

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Installation Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd quiz-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## 📖 Usage Guide

### Taking a Quiz

1. **Start**: Click the "Start Quiz" button to begin
2. **Answer Questions**: 
   - For multiple choice: Click on your chosen answer
   - For integer questions: Type your answer and click "Submit"
3. **Timer**: Watch the countdown timer (30 seconds per question)
4. **Progress**: Track your progress with the completion bar
5. **Results**: View your score and detailed feedback at the end

### Reviewing History

1. Access your attempt history after completing a quiz
2. Click on any attempt to view detailed results
3. See question-by-question breakdown of your answers

## 🌐 Deployment

The application is deployed and accessible at: [Quiz Platform](https://quiz-platform.vercel.app)

### Deployment Status



## 🔍 Known Issues & Limitations

- Authentication is required to save quiz attempts
- No offline support currently available
- Mobile network transitions may affect timer accuracy

## 🎯 Future Improvements

- [ ] Add different quiz categories
- [ ] Implement difficulty levels
- [ ] Add social sharing features
- [ ] Support for image-based questions
- [ ] Leaderboard functionality
- [ ] Quiz creation interface
- [ ] PWA support for offline access

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

Please ensure your PR description clearly describes the changes and their motivation.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev)
- UI components styled with [TailwindCSS](https://tailwindcss.com)
- Database powered by [Supabase](https://supabase.com)
