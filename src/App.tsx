import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, Music, Star, ArrowRight, Menu, X, Image, 
  TowerControl as GameController, BookHeart, Gift, 
  Calendar, Map, MessageCircleHeart as MessageHeart, Camera, Sparkles,
  HeartHandshake, Palette, Coffee, Share2, Download, ThumbsUp, Plus,
  ArrowLeft, Pause, Volume, Play, VolumeX, Sun
} from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [score, setScore] = useState(0);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showLanding, setShowLanding] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60); // 60 seconds timer
  const [gameOver, setGameOver] = useState(false);
  const [currentSong, setCurrentSong] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  const photoGallery = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80",
      title: "Our First Coffee Date",
      date: "January 15, 2024",
      description: "That magical morning when we first met at the corner café.",
      likes: 24,
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=800&q=80",
      title: "Evening Stroll",
      date: "January 20, 2024",
      description: "Walking under the stars, making wishes for our future.",
      likes: 32,
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80",
      title: "Sunset Picnic",
      date: "January 25, 2024",
      description: "A perfect evening with delicious food and even better company.",
      likes: 45,
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
      title: "Beach Day",
      date: "February 1, 2024",
      description: "Waves, sunshine, and endless laughter by the ocean.",
      likes: 38,
    }
  ];

  const gameCards = [
    <Heart className="w-8 h-8 text-red-500" />,
    <Star className="w-8 h-8 text-yellow-500" />,
    <Music className="w-8 h-8 text-blue-500" />,
    <BookHeart className="w-8 h-8 text-pink-500" />,
    <Gift className="w-8 h-8 text-purple-500" />,
    <Coffee className="w-8 h-8 text-brown-500" />,
    <Sparkles className="w-8 h-8 text-indigo-500" />,
    <MessageHeart className="w-8 h-8 text-teal-500" />
  ];

  const shuffledCards = [...gameCards, ...gameCards]
    .sort(() => Math.random() - 0.5);

  useEffect(() => {
    if (gameStarted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeRemaining === 0) {
      setGameOver(true);
    }
  }, [gameStarted, timeRemaining]);

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedPairs.includes(index)) return;
    
    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      if (Math.floor(newFlippedCards[0] / 2) === Math.floor(newFlippedCards[1] / 2)) {
        setMatchedPairs([...matchedPairs, ...newFlippedCards]);
        setScore(score + 1);
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  const navigationCategories = [
    {
      title: "Our Journey",
      items: [
        { name: 'Our Story', icon: <BookHeart className="w-5 h-5" />, page: 1 },
      ]
    },
    {
      title: "Why Us",
      items: [
        { name: 'Why Me', icon: <Heart className="w-5 h-5" />, page: 2 },
        { name: 'Why You', icon: <Star className="w-5 h-5" />, page: 3 },
      ]
    },
    {
      title: "Memories & Fun",
      items: [
        { name: 'Gallery', icon: <Camera className="w-5 h-5" />, page: 4 },
        { name: 'Playlist', icon: <Music className="w-5 h-5" />, page: 5 },
        { name: 'Play Game', icon: <GameController className="w-5 h-5" />, page: 6 },
      ]
    }
  ];

  const pages = [
    // Page 0 - My Dearest Love
    <div key="main" className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
        <Heart className="w-16 h-16 text-red-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-red-500 mb-6">My Dearest Love</h1>
        <div className="text-justify space-y-4">
          <p className="text-gray-700 leading-relaxed">
            From the moment I first saw you, I knew you were special. Your smile lights up my world in ways I never thought possible.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Every moment spent with you feels like a beautiful dream, and I want to make many more memories together.
          </p>
        </div>
        <button 
          onClick={() => setCurrentPage(1)}
          className="bg-red-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-red-600 transition flex items-center gap-2 mx-auto mt-8"
        >
          Begin Our Journey <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>,

    // Page 1 - Our Story
    <div key="story" className="min-h-screen bg-pink-50 p-4 pb-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <BookHeart className="w-16 h-16 text-pink-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-pink-600 mb-4">Our Story</h1>
          <p className="text-lg text-gray-700">
            Every chapter of our love story is a treasure I hold dear to my heart.
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-8 relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 w-1 h-full bg-pink-200 transform -translate-x-1/2"></div>

          {[
            {
              date: "First Meeting",
              description: "The day our eyes met and my world changed forever. Your smile was the most beautiful thing I'd ever seen.",
              icon: <Heart className="w-6 h-6 text-pink-500" />
            },
            {
              date: "First Date",
              description: "Our magical evening together, filled with laughter and the realization that this was something special.",
              icon: <Calendar className="w-6 h-6 text-pink-500" />
            },
            {
              date: "First Trip",
              description: "Exploring new places with you made every moment an adventure. Your excitement was contagious.",
              icon: <Map className="w-6 h-6 text-pink-500" />
            },
            {
              date: "Special Moments",
              description: "Countless memories of quiet evenings, shared dreams, and growing closer every day.",
              icon: <Camera className="w-6 h-6 text-pink-500" />
            },
            {
              date: "Overcoming Challenges",
              description: "Every obstacle we've faced has only made our bond stronger. Together, we're unstoppable.",
              icon: <HeartHandshake className="w-6 h-6 text-pink-500" />
            },
            {
              date: "Looking Forward",
              description: "I can't wait to create countless more memories with you. Our future together is bright and full of love.",
              icon: <Sparkles className="w-6 h-6 text-pink-500" />
            }
          ].map((event, index) => (
            <div 
              key={index}
              className="relative z-10 flex flex-col sm:flex-row items-center gap-6 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Date */}
              <div className="flex-shrink-0 w-24 text-center">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  {event.icon}
                </div>
                <p className="text-sm font-semibold text-pink-600">{event.date}</p>
              </div>

              {/* Description */}
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed">{event.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Final Message */}
        <div className="text-center mt-12">
          <p className="text-2xl font-bold text-pink-600 mb-4">
            Our story is my favorite, and I can't wait to write the next chapter with you.
          </p>
        </div>
      </div>
    </div>,

    // Page 2 - Why Me
    <div key="why-me" className="min-h-screen bg-pink-50 p-4 pb-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-pink-600 mb-4">Why Choose Me?</h1>
          <p className="text-lg text-gray-700">
            Here's what I bring to our beautiful relationship...
          </p>
        </div>

        {/* Qualities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            {
              title: "I Promise To",
              description: "Always be there for you, through thick and thin. I'll support your dreams and be your biggest cheerleader. My love for you is unwavering and eternal.",
              icon: <HeartHandshake className="w-8 h-8 text-pink-500" />
            },
            {
              title: "What I Bring",
              description: "A heart full of love, a mind full of ideas, and a soul that's completely devoted to you. I bring positivity, understanding, and endless affection to our relationship.",
              icon: <Gift className="w-8 h-8 text-pink-500" />
            },
            {
              title: "Fueling Creativity",
              description: "I'll inspire your creative side and help you explore new ideas. Together, we'll create beautiful memories and innovative projects that reflect our love.",
              icon: <Palette className="w-8 h-8 text-pink-500" />
            },
            {
              title: "Lifelong Learning",
              description: "I'm committed to growing with you, learning new things, and exploring the world together. Our journey will be filled with knowledge and shared experiences.",
              icon: <BookHeart className="w-8 h-8 text-pink-500" />
            },
            {
              title: "Melodic Inspiration",
              description: "I'll be the rhythm to your melody, creating harmony in our lives. Our love story will be the most beautiful song, with each note more perfect than the last.",
              icon: <Music className="w-8 h-8 text-pink-500" />
            },
            {
              title: "Capturing Moments",
              description: "I'll cherish every second with you, capturing our special moments in my heart. Our memories will be a treasure trove of love and happiness.",
              icon: <Camera className="w-8 h-8 text-pink-500" />
            }
          ].map((quality, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow transform hover:scale-[1.02]"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  {quality.icon}
                </div>
                <h3 className="text-xl font-bold text-pink-600">{quality.title}</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">{quality.description}</p>
            </div>
          ))}
        </div>

        {/* Final Message */}
        <div className="text-center mt-8">
          <p className="text-2xl font-bold text-pink-600 mb-4">
            Let's create our forever together!
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <button 
              className="bg-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-600 transition"
              onClick={() => alert("I'm so happy! ❤️")}
            >
              Absolutely!
            </button>
            <button 
              className="bg-gray-200 text-gray-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-300 transition"
              onClick={() => alert("Let's talk about it! 😊")}
            >
              Let's Discuss
            </button>
          </div>
        </div>
      </div>
    </div>,

    // Page 3 - Why You
    <div key="why-you" className="min-h-screen bg-pink-50 p-4 pb-24 overflow-y-auto scrollbar-hide">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-pink-600 mb-4">Why You're Special</h1>
          <p className="text-lg text-gray-700">
            You're the most amazing person I've ever met, and here's why...
          </p>
        </div>

        {/* Qualities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            {
              title: "Your Beautiful Soul",
              description: "Your kindness and compassion light up the world.",
              icon: <HeartHandshake className="w-8 h-8 text-pink-500" />
            },
            {
              title: "Your Amazing Smile",
              description: "Your smile can brighten even the darkest days.",
              icon: <Sparkles className="w-8 h-8 text-pink-500" />
            },
            {
              title: "Your Brilliant Mind",
              description: "Your intelligence and creativity inspire me daily.",
              icon: <Palette className="w-8 h-8 text-pink-500" />
            },
            {
              title: "Your Endless Laughter",
              description: "Your laughter is the most beautiful sound I know.",
              icon: <MessageHeart className="w-8 h-8 text-pink-500" />
            },
            {
              title: "Your Radiant Energy",
              description: "Your positivity and energy are contagious.",
              icon: <Sun className="w-8 h-8 text-pink-500" />
            },
            {
              title: "Your Unforgettable Charm",
              description: "Your unique charm makes you absolutely irresistible.",
              icon: <Star className="w-8 h-8 text-pink-500" />
            }
          ].map((quality, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow transform hover:scale-[1.02]"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  {quality.icon}
                </div>
                <h3 className="text-xl font-bold text-pink-600">{quality.title}</h3>
              </div>
              <p className="text-gray-700">{quality.description}</p>
            </div>
          ))}
        </div>

        {/* Final Message */}
        <div className="text-center mt-8">
          <p className="text-2xl font-bold text-pink-600 mb-4">
            Will you be my Valentine?
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <button 
              className="bg-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-600 transition"
              onClick={() => alert("Yay! ❤️")}
            >
              Yes!
            </button>
            <button 
              className="bg-gray-200 text-gray-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-300 transition"
              onClick={() => alert("Please reconsider! 😢")}
            >
              Maybe
            </button>
          </div>
        </div>
      </div>
    </div>,

    // Page 4 - Gallery
    <div key="gallery" className="h-screen bg-pink-50 p-4">
      <div className="h-full flex flex-col max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex-shrink-0">
          <h2 className="text-3xl font-bold text-purple-600 text-center mb-2">Our Memories</h2>
          <p className="text-center text-gray-700 mb-4 max-w-2xl mx-auto">
            Each photo tells a story of a moment we cherished together.
          </p>
        </div>

        {/* Photo Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {[
            { 
              url: "/images/memory1.jpg",
              title: "Our First Coffee Date",
              date: "January 15, 2024",
              description: "That magical morning when we first met at the corner café.",
              likes: 24,
            },
            { 
              url: "/images/memory2.jpg", 
              title: "Evening Stroll",
              date: "January 20, 2024",
              description: "Walking under the stars, making wishes for our future.",
              likes: 32,
            },
            { 
              url: "/images/memory3.jpg", 
              title: "Sunset Picnic",
              date: "January 25, 2024",
              description: "A perfect evening with delicious food and even better company.",
              likes: 45,
            },
            { 
              url: "/images/memory4.jpg", 
              title: "Beach Day",
              date: "February 1, 2024",
              description: "Waves, sunshine, and endless laughter by the ocean.",
              likes: 38,
            },
            { 
              url: "/images/memory5.jpg", 
              title: "Movie Night",
              date: "February 5, 2024",
              description: "Cuddling up together for our favorite movies.",
              likes: 28,
            },
            { 
              url: "/images/memory6.jpg", 
              title: "Morning Bliss",
              date: "February 10, 2024",
              description: "Waking up next to you is my favorite way to start the day.",
              likes: 42,
            }
          ].map((photo, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
            >
              {/* Image with overlay */}
              <div className="relative aspect-square">
                <img 
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Content */}
                <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{photo.title}</h3>
                  <p className="text-xs sm:text-sm text-white/80 mb-2">{photo.date}</p>
                  <p className="text-xs sm:text-sm text-white/90 line-clamp-2">{photo.description}</p>
                  <div className="mt-2 sm:mt-3 flex items-center gap-2">
                    <button className="p-1 sm:p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                      <ThumbsUp className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </button>
                    <span className="text-xs sm:text-sm text-white/90">{photo.likes}</span>
                  </div>
                </div>
              </div>
              
              {/* Hover Buttons */}
              <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="p-1 sm:p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                  <Share2 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                </button>
                <button className="p-1 sm:p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                  <Download className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Memory Message */}
        <div className="flex-shrink-0 text-center pt-4 pb-20">
          <h3 className="text-xl font-bold text-pink-600 mb-2">
            Let's keep creating memories together!
          </h3>
          <p className="text-gray-700 max-w-2xl mx-auto text-sm">
            Every moment with you is special, and I look forward to capturing many more beautiful memories with you in the future.
          </p>
        </div>
      </div>
    </div>,

    // Page 5 - Playlist
    <div key="playlist" className="min-h-screen bg-pink-50 p-4 pb-24">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-pink-600 text-center mb-8">Our Love Playlist</h2>
        <p className="text-center text-gray-700 mb-8">
          Every great love story needs a soundtrack. Here are the songs that remind me of us, and every beat of our hearts.
        </p>
        <div className="space-y-4 max-w-lg mx-auto">
          {[
            { 
              title: "Main Koye Aisa Geet Gaoon",
              artist: "Artist 1",
              desc: "This song reminds me of our first meeting.",
              file: "/songs/Main_Koye_Aisa_Geet_Gaoon.mp3"
            },
            { 
              title: "O Rangrez", 
              artist: "Artist 2", 
              desc: "This song was playing during our first date.",
              file: "/songs/O_Rangrez.mp3"
            },
            { 
              title: "Apna Bana Le", 
              artist: "Artist 3", 
              desc: "This song always makes me think of you.",
              file: "/songs/Apna_Bana_Le.mp3"
            },
            { 
              title: "Pal Pal Dil Ke Pass", 
              artist: "Artist 4", 
              desc: "This song is our special melody.",
              file: "/songs/Pal_Pal_Dil_Ke_Pass.mp3"
            }
          ].map((song, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-4 shadow-lg flex items-center gap-4 hover:shadow-xl transition-shadow"
            >
              {/* Music Symbol */}
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Music className="w-6 h-6 text-pink-500" />
              </div>

              {/* Song Info */}
              <div className="flex-grow min-w-0">
                <h3 className="text-lg font-semibold truncate">{song.title}</h3>
                <p className="text-sm text-gray-500 truncate">{song.artist}</p>
                <p className="text-xs text-gray-600 truncate">{song.desc}</p>
              </div>

              {/* Play Button */}
              <button
                onClick={() => {
                  setCurrentSong(index);
                  setIsPlaying(true);
                }}
                className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors flex-shrink-0"
              >
                <Play className="w-4 h-4 text-white pl-0.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>,

    // Page 6 - Game
    <div key="game" className="min-h-screen bg-pink-50 p-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-pink-600 text-center mb-4">Memory Game</h2>
        
        {/* Game Info */}
        <div className="flex justify-between items-center mb-8">
          <div className="bg-white p-3 rounded-lg shadow">
            <span className="text-gray-700">Score: {score}/8</span>
          </div>
          <div className="bg-white p-3 rounded-lg shadow">
            <span className="text-gray-700">Time: {timeRemaining}s</span>
          </div>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
          {shuffledCards.map((card, index) => (
            <button
              key={index}
              onClick={() => {
                if (!gameStarted) setGameStarted(true);
                handleCardClick(index);
              }}
              className={`aspect-square rounded-xl transition-all transform ${
                flippedCards.includes(index) || matchedPairs.includes(index)
                  ? 'bg-white'
                  : 'bg-red-500'
              } ${
                matchedPairs.includes(index) ? 'scale-95' : 'hover:scale-105'
              }`}
              disabled={matchedPairs.includes(index)}
            >
              {(flippedCards.includes(index) || matchedPairs.includes(index)) && (
                <div className="flex items-center justify-center">
                  {card}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Game Controls */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => {
              setGameStarted(true);
              setTimeRemaining(60);
              setScore(0);
              setFlippedCards([]);
              setMatchedPairs([]);
              setGameOver(false);
            }}
            className="bg-red-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-600 transition"
          >
            {gameOver ? 'Play Again' : 'Restart'}
          </button>
        </div>

        {/* Game Over Message */}
        {gameOver && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-3xl p-8 max-w-md text-center">
              <h3 className="text-2xl font-bold text-red-500 mb-4">Game Over!</h3>
              <p className="text-gray-700 mb-6">
                You matched {score} pairs in 60 seconds. {score === 8 ? 'Perfect score!' : 'Try again?'}
              </p>
              <button
                onClick={() => {
                  setGameOver(false);
                  setTimeRemaining(60);
                  setScore(0);
                  setFlippedCards([]);
                  setMatchedPairs([]);
                }}
                className="bg-red-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-600 transition"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  ];

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleLoadedData = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSongEnd = () => {
    setIsPlaying(false);
    setCurrentSong(prev => (prev! < 3 ? prev! + 1 : 0));
  };

  useEffect(() => {
    if (currentSong !== null && audioRef.current) {
      audioRef.current.src = [
        "/songs/Main_Koye_Aisa_Geet_Gaoon.mp3",
        "/songs/O_Rangrez.mp3",
        "/songs/Apna_Bana_Le.mp3",
        "/songs/Pal_Pal_Dil_Ke_Pass.mp3"
      ][currentSong];
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSong, isPlaying]);

  return (
    <div className="relative">
      {/* Landing Page */}
      {showLanding && (
        <div className="fixed inset-0 bg-pink-50 flex items-center justify-center p-4 z-50">
          <div className="text-center">
            <button 
              onClick={() => setShowLanding(false)}
              className="text-[10rem] transform transition-all duration-500 hover:scale-110 hover:rotate-6"
            >
              💌
            </button>
            <p className="mt-2 text-lg text-pink-600 font-semibold animate-bounce">
              Click to open
              <span className="ml-1 animate-pulse">❤️</span>
            </p>
          </div>
        </div>
      )}

      {/* My Dearest Love Page */}
      {!showLanding && currentPage === 0 && (
        <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
            <Heart className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-red-500 mb-6">My Dearest Love</h1>
            <div className="text-justify space-y-4">
              <p className="text-gray-700 leading-relaxed">
                From the moment I first saw you, I knew you were special. Your smile lights up my world in ways I never thought possible.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Every moment spent with you feels like a beautiful dream, and I want to make many more memories together.
              </p>
            </div>
            <button 
              onClick={() => setCurrentPage(1)}
              className="bg-red-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-red-600 transition flex items-center gap-2 mx-auto mt-8"
            >
              Begin Our Journey <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Bar and Main Content */}
      {!showLanding && currentPage !== 0 && (
        <div>
          {/* Toggle Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="fixed top-4 left-4 z-50 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Enhanced Sidebar */}
          <div
            className={`fixed top-0 left-0 h-full bg-white shadow-2xl transition-transform transform z-40 overflow-y-auto
                       ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            style={{ width: '280px' }}
          >
            <div className="p-6 pt-20">
              <div className="flex items-center gap-2 mb-8">
                <BookHeart className="w-6 h-6 text-red-500" />
                <h2 className="text-xl font-bold text-gray-800">Valentine ❤️</h2>
              </div>
              <nav className="space-y-6">
                {navigationCategories.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      {category.title}
                    </h3>
                    <div className="space-y-1">
                      {category.items.map((item, itemIndex) => (
                        <button
                          key={itemIndex}
                          onClick={() => {
                            setCurrentPage(item.page);
                            setIsSidebarOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                                    ${currentPage === item.page 
                                      ? 'bg-red-50 text-red-600' 
                                      : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                          {item.icon}
                          <span>{item.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className={`transition-transform ${isSidebarOpen ? 'lg:pl-[280px]' : ''}`}>
            {pages[currentPage]}
            
            {/* Add Begin Our Journey button */}
            {currentPage !== 0 && (
              <div className="fixed bottom-20 right-4 sm:right-8 z-40">
                <button 
                  onClick={() => setCurrentPage((prev) => (prev + 1) % pages.length)}
                  className="bg-red-500 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold hover:bg-red-600 transition flex items-center gap-2 shadow-lg text-sm sm:text-base"
                >
                  Continue <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Music Player */}
      {currentSong !== null && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg shadow-2xl p-2 sm:p-3 border-t border-pink-100 z-50">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            {/* Song Info */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 w-full sm:w-auto">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-pink-100 rounded-lg flex items-center justify-center shadow-sm">
                <Music className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />
              </div>
              <div className="min-w-0 flex-1 sm:flex-none">
                <h3 className="font-semibold text-pink-700 text-sm truncate">
                  {[
                    { title: "Main Koye Aisa Geet Gaoon" },
                    { title: "O Rangrez" },
                    { title: "Apna Bana Le" },
                    { title: "Pal Pal Dil Ke Pass" }
                  ][currentSong].title}
                </h3>
              </div>
            </div>

            {/* Controls */}
            <div className="w-full sm:w-auto flex items-center gap-2 sm:gap-3 flex-grow">
              {/* Backward Button */}
              <button
                onClick={() => setCurrentSong(prev => (prev! > 0 ? prev! - 1 : 3))}
                className="p-1 sm:p-2 rounded-full hover:bg-pink-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />
              </button>

              {/* Play/Pause Button */}
              <button
                onClick={() => {
                  if (audioRef.current) {
                    if (isPlaying) {
                      audioRef.current.pause();
                    } else {
                      audioRef.current.play();
                    }
                    setIsPlaying(!isPlaying);
                  }
                }}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition-all transform hover:scale-105 active:scale-95 shadow"
              >
                {isPlaying ? (
                  <Pause className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                ) : (
                  <Play className="w-3 h-3 sm:w-4 sm:h-4 text-white pl-0.5" />
                )}
              </button>

              {/* Forward Button */}
              <button
                onClick={() => setCurrentSong(prev => (prev! < 3 ? prev! + 1 : 0))}
                className="p-1 sm:p-2 rounded-full hover:bg-pink-50 transition-colors"
              >
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />
              </button>

              {/* Progress Bar */}
              <div className="flex-grow mx-1 sm:mx-3">
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={(e) => {
                    if (audioRef.current) {
                      audioRef.current.currentTime = parseFloat(e.target.value);
                      setCurrentTime(parseFloat(e.target.value));
                    }
                  }}
                  className="w-full h-1 bg-pink-100 rounded-full appearance-none cursor-pointer accent-pink-500"
                />
              </div>

              {/* Volume Control */}
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => setVolume(volume > 0 ? 0 : 1)}
                  className="p-1 sm:p-2 rounded-full hover:bg-pink-50 transition-colors"
                >
                  {volume > 0 ? (
                    <Volume className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />
                  ) : (
                    <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />
                  )}
                </button>
                <div className="relative group">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => {
                      const newVolume = parseFloat(e.target.value);
                      if (audioRef.current) {
                        audioRef.current.volume = newVolume;
                      }
                      setVolume(newVolume);
                    }}
                    className="w-12 sm:w-16 h-1 bg-pink-100 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, pink ${volume * 100}%, #f3f4f6 ${volume * 100}%)`
                    }}
                  />
                  <div className="absolute -top-6 right-0 bg-pink-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {Math.round(volume * 100)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Audio Element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={handleLoadedData}
        onEnded={handleSongEnd}
        volume={volume}
      />
    </div>
  );
}

export default App;