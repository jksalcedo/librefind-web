export type SubmissionStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type SubmissionKind = 'NEW_ALTERNATIVE' | 'NEW_PROPRIETARY' | 'LINKING';
export type SourceTable = 'user_submissions' | 'user_linking_submissions';
export type VoteValue = 1 | -1;
export type Badge = 'Scout' | 'Guide' | 'Curator';

export type QueueFilter = 'all' | SubmissionKind;
export type QueueSort = 'newest' | 'oldest' | 'most_upvoted' | 'most_downvoted';

export type DownvoteReason =
    | 'DUPLICATE'
    | 'WRONG_CATEGORY'
    | 'FAKE_SUBMISSION'
    | 'NOT_ENOUGH_INFO'
    | 'OTHER';

export interface Target {
    name: string;
    package_name: string;
}

export interface Solution {
    name: string;
    package_name: string;
}

export interface Profile {
    id: string;
    username: string;
    avatar_url: string | null;
    badge: Badge;
    reputation_score: number;
    submission_count: number;
    approved_count: number;
    rejected_count: number;
}

export interface Submission {
    id: string;
    submitter_id: string;
    app_name: string;
    app_package: string;
    description: string | null;
    submission_type: Exclude<SubmissionKind, 'LINKING'>;
    status: SubmissionStatus;
    repo_url: string | null;
    fdroid_id: string | null;
    license: string | null;
    category: string | null;
    proprietary_package: string | null;
    alternatives: string[] | null;
    rejection_reason: string | null;
    last_edited_by: string | null;
    last_edited_at: string | null;
    contributors: string[] | null;
    created_at: string;
    profiles?: Profile | null;
}

export interface LinkingSubmission {
    id: string;
    submitter_id: string;
    proprietary_package: string;
    alternatives: string[];
    status: SubmissionStatus;
    rejection_reason: string | null;
    last_edited_by: string | null;
    last_edited_at: string | null;
    contributors: string[] | null;
    created_at: string;
    profiles?: Profile | null;
}

/** Normalised row returned by get_community_queue(). */
export interface CommunityItem {
    id: string;
    source_table: SourceTable;
    kind: SubmissionKind;
    title: string;
    package_name: string | null;
    replaces: string | null;
    description: string | null;
    submitter_id: string;
    last_edited_by: string | null;
    created_at: string;
    username: string | null;
    avatar_url: string | null;
    badge: Badge | null;
    reputation_score: number | null;
    upvotes: number;
    downvotes: number;
    my_vote: VoteValue | null;
}

export interface CommunityQueue {
    total: number;
    items: CommunityItem[];
}

export interface SubmissionVote {
    submission_id: string;
    submission_table: SourceTable;
    user_id: string;
    vote: VoteValue;
    reason: DownvoteReason | null;
    reason_detail: string | null;
}

export interface Comment {
    id: string;
    target_id: string;
    user_id: string;
    content: string;
    created_at: string;
    profiles?: Profile | null;
}
