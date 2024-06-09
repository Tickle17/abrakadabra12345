import React, { useEffect, useState } from 'react';
import { AppLayout } from '@/shared/layouts';
import { Recommendations, ThredList } from '@/widgets';
import {
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';

import { POST_ARRAY } from '@/shared/dataset/threads.ts';

type FiltersType = {
  role: string;
  level: string;
  contentSearch: string;
};

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

const Filters = ({
  filters,
  setFilters,
}: {
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
}) => {
  const handleSelectChange = (id: string, value: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [id]: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [id]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-4 col-span-3 p-4 bg-card text-card-foreground shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Filter Threads</h2>
      <div className="flex flex-col gap-4">
        <div>
          <Label className="block text-sm font-medium mb-2" htmlFor="role">
            Role
          </Label>
          <Select
            value={filters.role}
            onValueChange={(value: string) => handleSelectChange('role', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={roleOptions[0]} />
            </SelectTrigger>
            <SelectContent>
              {roleOptions.map(role => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="block text-sm font-medium mb-2" htmlFor="level">
            Level
          </Label>
          <Select
            value={filters.level}
            onValueChange={(value: string) =>
              handleSelectChange('level', value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={levelOptions[0]} />
            </SelectTrigger>
            <SelectContent>
              {levelOptions.map(level => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label
            className="block text-sm font-medium mb-2"
            htmlFor="contentSearch"
          >
            Search Content
          </Label>
          <Input
            type="text"
            id="contentSearch"
            value={filters.contentSearch}
            onChange={handleInputChange}
            className="w-full"
            placeholder="Search content..."
          />
        </div>
      </div>
    </div>
  );
};

export const Threads = () => {
  const [filters, setFilters] = useState<FiltersType>({
    role: roleOptions[0],
    level: levelOptions[0],
    contentSearch: '',
  });

  /*
  useEffect(() => {
    console.log(articles);
  }, [articles]);
  */

  const filteredPosts = POST_ARRAY.filter(post => {
    const roleMatch =
      filters.role !== 'All' ? post.author.role === filters.role : true;
    const levelMatch =
      filters.level !== 'All' ? post.author.level === filters.level : true;
    const contentMatch = filters.contentSearch
      ? post.content.toLowerCase().includes(filters.contentSearch.toLowerCase())
      : true;

    return roleMatch && levelMatch && contentMatch;
  });

  return (
    <AppLayout>
      <Filters filters={filters} setFilters={setFilters} />
      <div className="col-span-6 grid grid-cols-1 grid-rows-12 gap-4 bg-card">
        <div className="row-span-12">
          <ThredList data={[]} />
        </div>
      </div>
      <Recommendations />
    </AppLayout>
  );
};

const roleOptions = [
  'All',
  'Mad Arab',
  'Sorcerer',
  'Librarian',
  'Messenger',
  'Scientist',
  'Captain',
  'Witch',
];

const levelOptions = [
  'All',
  'High Priest',
  'Adept',
  'Senior',
  'Master',
  'Researcher',
];
