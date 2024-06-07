import { ScrollArea } from '@/shared/ui/scroll-area';

import {
  BookmarkIcon,
  ChatBubbleIcon,
  DotsVerticalIcon,
  HeartIcon,
  Share2Icon,
} from '@radix-ui/react-icons';
import { PostType } from '@/shared/dataset/threads.ts';

const Post = ({ post }: { post: PostType }) => {
  return (
    <div className="flex flex-col gap-3 mb-3 bg-card">
      <div className="flex flex-col gap-2 rounded-sm border border-slate-200 p-3 relative ">
        <div className="w-full flex justify-between">
          <div className="flex items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-gray-300 border border-slate-900" />
            <div className="flex flex-col gap-2">
              <div className="flex gap-1">
                <span className="text-sm">{post.author.name}</span>
                <span className="text-[10px] bg-indigo-500 px-[4px] py-[2px]">
                  {post.author.level}
                </span>
              </div>
              <p className="w-max text-xs items-center">{post.author.role}</p>
            </div>
          </div>
          <DotsVerticalIcon />
        </div>
        <p className="text-s">{post.content}</p>
        <div className="flex items-center gap-2">
          <span className="text-xs">{post.date}</span>
        </div>
        <div className="w-full flex justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <HeartIcon /> <span>{post.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <ChatBubbleIcon /> <span>{post.comments}</span>
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
      </div>
    </div>
  );
};

const ThredList = ({ data }: { data: PostType[] }) => {
  if (!data.length) return null;

  return (
    <ScrollArea className="w-full h-full max-h-full shadow-sm p-4">
      {data.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </ScrollArea>
  );
};

export default ThredList;
