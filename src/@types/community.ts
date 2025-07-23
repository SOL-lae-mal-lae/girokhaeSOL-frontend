import { StockItem } from './stockItem';

export interface CommunityPost {
	post_type: boolean;
	title: string;
	content: string;
	trade_log_id: number | null;
	is_public: boolean;
	tags: StockItem[];
}
