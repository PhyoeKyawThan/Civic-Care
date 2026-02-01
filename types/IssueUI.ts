import { IssueStatus, IssueVote } from "@/services/issues";


export type IssueUI = {
  id: string;

  username: string;
  full_name: string,
  profile_image: string | null;

  title: string;
  reported_text: string;
  reported_date: string;

  reported_images: string[];


  status: IssueStatus;
  votes: IssueVote;
  is_viewed: boolean;
};
