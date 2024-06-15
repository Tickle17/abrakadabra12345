import { ScrollArea } from '@/shared/ui/scroll-area.tsx';
import {
  BookmarkIcon,
  ChatBubbleIcon,
  DotsVerticalIcon,
  HeartIcon,
  Share2Icon,
} from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import { forwardRef, RefObject, useEffect, useState } from 'react';

type ArticleDetails = {
  type_of: string;
  id: number;
  title: string;
  description: string;
  readable_publish_date: string;
  slug: string;
  path: string;
  url: string;
  comments_count: number;
  public_reactions_count: number;
  collection_id: null | number;
  published_timestamp: string;
  positive_reactions_count: number;
  cover_image: null | string;
  social_image: string;
  canonical_url: string;
  created_at: string;
  edited_at: null | string;
  crossposted_at: null | string;
  published_at: string;
  last_comment_at: string;
  reading_time_minutes: number;
  tag_list: string[];
  tags: string;
  user: {
    name: string;
    username: string;
    twitter_username: null | string;
    github_username: string;
    user_id: number;
    website_url: null | string;
    profile_image: string;
    profile_image_90: string;
  };
};

interface PostProps {
  post: ArticleDetails;
  ref?: RefObject<HTMLDivElement>;
}

export const Post = forwardRef<HTMLDivElement, PostProps>(({ post }, ref) => {
  return (
    <div className="flex flex-col gap-3 mb-3 bg-card w-full" ref={ref}>
      <Link
        to={post.url}
        target="_blank"
        className="flex flex-col gap-2 rounded-sm border border-slate-200 hover:border-slate-950 hover:cursor-pointer transition-all p-3 relative"
      >
        <div className="w-full flex justify-between">
          <div className="flex items-center gap-2">
            <div className="w-14 h-14 rounded-full border border-slate-900">
              <img
                className="w-full h-full object-cover rounded-full"
                src={post.cover_image || post.user.profile_image}
                alt=""
              ></img>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <span className="text-sm">{post.user.name}</span>
                {post.tag_list.map((tag, index) => (
                  <span
                    key={index}
                    className="text-[10px] bg-indigo-200 text-slate-950 px-[4px] py-[2px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="w-max text-xs items-center">{post.title}</p>
            </div>
          </div>
          <DotsVerticalIcon />
        </div>
        <p className="text-xs w-full max-w-full">{post.description}</p>
        <div className="flex items-center gap-2">
          <span className="text-xs">{post.readable_publish_date}</span>
        </div>
        <div className="w-full flex justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <HeartIcon /> <span>{post.public_reactions_count}</span>
            </div>
            <div className="flex items-center gap-1">
              <ChatBubbleIcon /> <span>{post.comments_count}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Share2Icon />
            </div>
            <div className="flex items-center gap-1">
              <BookmarkIcon />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
});

Post.displayName = 'Post';

const ThredList = () => {
  const [articles, setArticles] = useState<ArticleDetails[]>([]);
  const [, setIsLoading] = useState(false);

  const fetchArticles = async () => {
    setIsLoading(true);
    const response = await fetch(
      `https://dev.to/api/articles?per_page=100&sort_by=popularity&page=1`
    );
    const json = await response.json();
    setArticles(prev => [...prev, ...json]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <ScrollArea className="w-full h-full max-h-full shadow-sm p-4">
      <div className="flex flex-col gap-4 relative">
        <div className="w-full flex flex-col gap-4 absolute justify-center items-center">
          {articles
            .filter(
              (item, index, self) =>
                index === self.findIndex(t => t.id === item.id)
            )
            .map(post => {
              return <Post key={`${post.id}`} post={post} />;
            })}
        </div>
      </div>
    </ScrollArea>
  );
};

export default ThredList;
