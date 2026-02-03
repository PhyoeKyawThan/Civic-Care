// useVote.ts
import { useAuth } from "@/hooks/use-auth";
import { getToken } from "@/utils/test-token-storage";
import { useCallback, useState } from "react";
import { IssueVote } from "./issues";
import { useServicesEntries } from "./services_endpoints";

interface UseVoteProps {
  issue_id: string;
  initialVotes?: IssueVote;
}

export const useVote = ({ issue_id, initialVotes }: UseVoteProps) => {
  const [vote, setVote] = useState<IssueVote>(
    initialVotes || { up: 0, down: 0, score: 0, my_vote: 0 }
  );
  const { refreshToken, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { getIssuesEntry } = useServicesEntries();

  const sendVote = useCallback(
    async (value: number) => {
      setIsLoading(true); 

      const doRequest = async () => {
        const access = await getToken();
        return fetch(
          `${getIssuesEntry}/${issue_id}/vote/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access}`,
            },
            body: JSON.stringify({ value }),
          }
        );
      };

      try {
        let response = await doRequest();

        if (response.status === 403) {
          await refreshToken();
          response = await doRequest();
        }

        if (response.ok) {
          const newVoteSummary = await response.json();
          setVote(newVoteSummary);
        } else {
          console.error("Failed to submit vote");
        }
      } catch (error) {
        console.error("Error submitting vote:", error);
        await logout();
      } finally {
        setIsLoading(false);
      }
    },
    [issue_id, refreshToken, logout]
  );

  return { vote, sendVote, isLoading };
};
