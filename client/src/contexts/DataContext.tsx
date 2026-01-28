import React, { createContext, useContext, useState } from 'react';

export interface Card {
  id: string;
  name: string;
  series: string;
  number: string;
  condition: 'Mint' | 'Near Mint' | 'Excellent' | 'Very Good' | 'Good' | 'Lightly Played';
  conditionScore: number;
  price: number;
  image: string;
  vendorId: string;
  vendorName: string;
  vendorRating: number;
  acceptsTrade: boolean;
  language: 'Português' | 'Inglês' | 'Japonês';
  printType: 'Holo' | 'Reverse Holo' | 'Normal';
  authentic: boolean;
  photos: string[];
  createdAt: string;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'trade';
  cardId: string;
  cardName: string;
  cardImage: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  amount: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'completed' | 'cancelled';
  paymentMethod?: 'credit_card' | 'pix';
  trackingCode?: string;
  shippingDate?: string;
  deliveryDate?: string;
  buyerPhotos?: string[];
  sellerPhotos?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'trade_proposal' | 'trade_accepted' | 'purchase_shipped' | 'purchase_delivered' | 'new_message' | 'rating_received';
  title: string;
  message: string;
  read: boolean;
  relatedId?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  message: string;
  createdAt: string;
}

export interface Review {
  id: string;
  transactionId: string;
  reviewerId: string;
  reviewerName: string;
  revieweeId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface DataContextType {
  cards: Card[];
  transactions: Transaction[];
  notifications: Notification[];
  chatMessages: ChatMessage[];
  reviews: Review[];
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (id: string) => void;
  addChatMessage: (message: ChatMessage) => void;
  addReview: (review: Review) => void;
  getTransactionsByUserId: (userId: string) => Transaction[];
  getNotificationsByUserId: (userId: string) => Notification[];
  getChatMessages: (conversationId: string) => ChatMessage[];
  getReviewsForUser: (userId: string) => Review[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Mock data
const MOCK_CARDS: Card[] = [
  {
    id: '1',
    name: 'Charizard EX',
    series: 'Base Set',
    number: '4/102',
    condition: 'Mint',
    conditionScore: 10,
    price: 450,
    image: '/images/charizard-ex-3.jpg',
    vendorId: '2',
    vendorName: 'TraderPro',
    vendorRating: 4.8,
    acceptsTrade: true,
    language: 'Inglês',
    printType: 'Holo',
    authentic: true,
    photos: ['/images/charizard-ex-3.jpg'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Charizard EX 151',
    series: 'Pokémon 151',
    number: '6/165',
    condition: 'Near Mint',
    conditionScore: 9,
    price: 280,
    image: '/images/charizard-ex-1.png',
    vendorId: '3',
    vendorName: 'CardCollector',
    vendorRating: 4.7,
    acceptsTrade: false,
    language: 'Inglês',
    printType: 'Holo',
    authentic: true,
    photos: ['/images/charizard-ex-1.png'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Charizard EX Full Art',
    series: 'Scarlet & Violet',
    number: '175/167',
    condition: 'Mint',
    conditionScore: 10,
    price: 520,
    image: '/images/charizard-ex-2.png',
    vendorId: '4',
    vendorName: 'VintageCards',
    vendorRating: 4.9,
    acceptsTrade: true,
    language: 'Inglês',
    printType: 'Holo',
    authentic: true,
    photos: ['/images/charizard-ex-2.png'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Ash Ketchum GX',
    series: 'Hidden Fates',
    number: '185/185',
    condition: 'Lightly Played',
    conditionScore: 7,
    price: 150,
    image: '/images/ash-ketchum.jpg',
    vendorId: '5',
    vendorName: 'GottaCatchEm',
    vendorRating: 4.6,
    acceptsTrade: false,
    language: 'Inglês',
    printType: 'Holo',
    authentic: true,
    photos: ['/images/ash-ketchum.jpg'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Dragonite V',
    series: 'Evolving Skies',
    number: '140/203',
    condition: 'Excellent',
    conditionScore: 8,
    price: 380,
    image: '/images/dragonite-v.jpg',
    vendorId: '6',
    vendorName: 'ProTrader',
    vendorRating: 4.8,
    acceptsTrade: true,
    language: 'Inglês',
    printType: 'Holo',
    authentic: true,
    photos: ['/images/dragonite-v.jpg'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Mewtwo Promo',
    series: 'Base Set',
    number: '10/102',
    condition: 'Near Mint',
    conditionScore: 9,
    price: 320,
    image: '/images/mewtwo-promo.jpg',
    vendorId: '7',
    vendorName: 'DragonLover',
    vendorRating: 4.7,
    acceptsTrade: true,
    language: 'Inglês',
    printType: 'Holo',
    authentic: true,
    photos: ['/images/mewtwo-promo.jpg'],
    createdAt: new Date().toISOString(),
  },
];

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    type: 'buy',
    cardId: '1',
    cardName: 'Charizard EX',
    cardImage: '/images/charizard-ex.jpg',
    buyerId: '1',
    buyerName: 'João Silva',
    sellerId: '2',
    sellerName: 'TraderPro',
    amount: 450,
    status: 'completed',
    paymentMethod: 'pix',
    trackingCode: 'AA123456789BR',
    shippingDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    deliveryDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    transactionId: 'tx-1',
    reviewerId: '1',
    reviewerName: 'João Silva',
    revieweeId: '2',
    rating: 5,
    comment: 'Excelente vendedor! Carta chegou perfeita e bem embalada.',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [cards] = useState<Card[]>(MOCK_CARDS);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);

  const addTransaction = (transaction: Transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions(
      transactions.map(t => (t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t))
    );
  };

  const addNotification = (notification: Notification) => {
    setNotifications([notification, ...notifications]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(
      notifications.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const addChatMessage = (message: ChatMessage) => {
    setChatMessages([...chatMessages, message]);
  };

  const addReview = (review: Review) => {
    setReviews([...reviews, review]);
  };

  const getTransactionsByUserId = (userId: string) => {
    return transactions.filter(t => t.buyerId === userId || t.sellerId === userId);
  };

  const getNotificationsByUserId = (userId: string) => {
    return notifications.filter(n => n.userId === userId);
  };

  const getChatMessages = (conversationId: string) => {
    return chatMessages.filter(m => m.conversationId === conversationId);
  };

  const getReviewsForUser = (userId: string) => {
    return reviews.filter(r => r.revieweeId === userId);
  };

  return (
    <DataContext.Provider
      value={{
        cards,
        transactions,
        notifications,
        chatMessages,
        reviews,
        addTransaction,
        updateTransaction,
        addNotification,
        markNotificationAsRead,
        addChatMessage,
        addReview,
        getTransactionsByUserId,
        getNotificationsByUserId,
        getChatMessages,
        getReviewsForUser,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}
