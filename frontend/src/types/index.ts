export type UserRole = 'admin' | 'donor' | 'organization' | 'volunteer';

export type DonationCategory = 'food' | 'books' | 'clothes';
export type DonationStatus = 'pending' | 'requested' | 'accepted' | 'in-progress' | 'completed';
export type RewardLevel = 'none' | 'bronze' | 'silver' | 'gold' | 'diamond';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  level: RewardLevel;
  totalContributions: number;
  createdAt: string;
}

export interface Donation {
  id: string;
  donorId: string;
  donorName: string;
  category: DonationCategory;
  title: string;
  description: string;
  quantity: number;
  status: DonationStatus;
  createdAt: string;
  // Category-specific
  freshnessDuration?: string; // food
  bookType?: 'academic' | 'story' | 'notebooks'; // books
  clothesGender?: 'male' | 'female' | 'unisex'; // clothes
  clothesAgeGroup?: 'kids' | 'teens' | 'adults'; // clothes
  organizationId?: string;
  organizationName?: string;
  volunteerId?: string;
  volunteerName?: string;
}

export interface DonationRequest {
  id: string;
  donationId: string;
  donationTitle: string;
  requesterId: string;
  requesterName: string;
  requesterRole: 'organization' | 'volunteer';
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  chatId: string;
}

export interface Chat {
  id: string;
  participants: { id: string; name: string; role: UserRole }[];
  lastMessage?: string;
  lastMessageTime?: string;
  donationId?: string;
}

export interface Certificate {
  id: string;
  userId: string;
  userName: string;
  role: UserRole;
  level: RewardLevel;
  contributions: number;
  awardedAt: string;
}

export interface ActivityFeedItem {
  id: string;
  type: 'donation_created' | 'donation_completed' | 'new_organization' | 'level_up';
  message: string;
  timestamp: string;
  userId: string;
  userName: string;
}
