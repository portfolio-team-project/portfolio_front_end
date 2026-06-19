export interface QnaListItem {
  qnaSeq: number;
  nickname: string | null;
  title: string;
  regDt: string;
  answerYn: string;
  viewCnt: number;
}

export interface QnaDetailItem {
  qnaSeq: number;
  nickname: string | null;
  title: string;
  content: string;
  regDt: string;
  answerYn: string;
  answer: string | null;
  answerDt: string | null;
  viewCnt: number;
  isMember: boolean;
}

export interface QnaPageResponse {
  content: QnaListItem[];
  page: {
    totalPages: number;
    totalElements: number;
    number: number;
  };
}

export interface QnaGuestRequest {
  nickname: string;
  title: string;
  content: string;
}

export interface QnaMemberRequest {
  title: string;
  content: string;
}
