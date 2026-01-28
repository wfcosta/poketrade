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
  {
    id: '7',
    name: 'Pikachu Base Set',
    series: 'Base Set',
    number: '25/102',
    condition: 'Mint',
    conditionScore: 10,
    price: 580,
    image: '/images/holo-collection.jpg',
    vendorId: '8',
    vendorName: 'PikachuLover',
    vendorRating: 4.9,
    acceptsTrade: true,
    language: 'Inglês',
    printType: 'Holo',
    authentic: true,
    photos: ['/images/holo-collection.jpg'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'Blastoise Holo',
    series: 'Base Set',
    number: '2/102',
    condition: 'Excellent',
    conditionScore: 8,
    price: 420,
    image: '/images/starter-set.jpg',
    vendorId: '9',
    vendorName: 'WaterType',
    vendorRating: 4.6,
    acceptsTrade: true,
    language: 'Inglês',
    printType: 'Holo',
    authentic: true,
    photos: ['/images/starter-set.jpg'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '9',
    name: 'Venusaur 1st Edition',
    series: 'Base Set',
    number: '15/102',
    condition: 'Near Mint',
    conditionScore: 9,
    price: 490,
    image: '/images/holo-collection.jpg',
    vendorId: '10',
    vendorName: 'GrassType',
    vendorRating: 4.8,
    acceptsTrade: false,
    language: 'Inglês',
    printType: 'Holo',
    authentic: true,
    photos: ['/images/holo-collection.jpg'],
    createdAt: new Date().toISOString(),
  },
];

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    type: 'buy',
    cardId: '1',
    cardName: 'Charizard EX',
    cardImage: '/images/charizard-ex-3.jpg',
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
  {
    id: 'tx-2',
    type: 'sell',
    cardId: '5',
    cardName: 'Dragonite V',
    cardImage: '/images/dragonite-v.jpg',
    buyerId: '3',
    buyerName: 'Maria Santos',
    sellerId: '1',
    sellerName: 'João Silva',
    amount: 380,
    status: 'shipped',
    paymentMethod: 'credit_card',
    trackingCode: 'BB987654321BR',
    shippingDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'tx-3',
    type: 'trade',
    cardId: '3',
    cardName: 'Charizard EX Full Art',
    cardImage: '/images/charizard-ex-2.png',
    buyerId: '1',
    buyerName: 'João Silva',
    sellerId: '4',
    sellerName: 'VintageCards',
    amount: 520,
    status: 'pending',
    paymentMethod: 'pix',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'tx-4',
    type: 'buy',
    cardId: '6',
    cardName: 'Mewtwo Promo',
    cardImage: '/images/mewtwo-promo.jpg',
    buyerId: '1',
    buyerName: 'João Silva',
    sellerId: '7',
    sellerName: 'DragonLover',
    amount: 320,
    status: 'paid',
    paymentMethod: 'pix',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    userId: '1',
    type: 'purchase_shipped',
    title: 'Seu pedido foi enviado!',
    message: 'TraderPro enviou sua carta Charizard EX. Código de rastreio: AA123456789BR',
    read: true,
    relatedId: 'tx-1',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif-2',
    userId: '1',
    type: 'purchase_delivered',
    title: 'Pedido entregue!',
    message: 'Sua carta Charizard EX foi entregue com sucesso. Deixe uma avaliação!',
    read: true,
    relatedId: 'tx-1',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif-3',
    userId: '1',
    type: 'trade_proposal',
    title: 'Nova proposta de troca!',
    message: 'CardCollector quer trocar uma carta com você. Confira os detalhes!',
    read: false,
    relatedId: 'tx-3',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif-4',
    userId: '1',
    type: 'new_message',
    title: 'Nova mensagem de ProTrader',
    message: 'ProTrader: Oi! Você ainda tem interesse na carta?',
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif-5',
    userId: '1',
    type: 'rating_received',
    title: 'Você recebeu uma avaliação!',
    message: 'TraderPro te avaliou com 5 estrelas: "Excelente comprador!"',
    read: false,
    relatedId: 'tx-1',
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
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
  {
    id: 'rev-2',
    transactionId: 'tx-1',
    reviewerId: '2',
    reviewerName: 'TraderPro',
    revieweeId: '1',
    rating: 5,
    comment: 'Excelente comprador! Pagamento rápido e comunicação clara.',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [cards] = useState<Card[]>(MOCK_CARDS);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
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
