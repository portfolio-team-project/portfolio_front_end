export interface boardListItem {
  localId: number;
  userId: string | null;
  title: string;
  createdDate: string;
  viewCnt: number;
  likeCnt: number;
  noticeYn: string;
}

export interface boardPageResponse {
  content: boardListItem[];
  page: {
    totalPages: number;
    totalElements: number;
    number: number;
  };
}

export interface boardDetailItem {
  localId: number;
  userId: string;
  title: string;
  content: string;
  createdDate: string;
  viewCnt: number;
  likeCnt: number;
}

export interface boardWriteRequest {
  title: string;
  content: string;
}

export interface commentItem {
  localId: number;
  boardId: number;
  userId: string;
  content: string;
  createdDate: string;
  updatedDate: string | null;
}
