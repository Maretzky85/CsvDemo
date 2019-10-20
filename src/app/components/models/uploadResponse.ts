export interface UploadResponse {
  total: number;
  accepted: number;
  failed: number;
  failedList: FailedList[];
}

interface FailedList {
  Input: string;
  Error: string;
}
