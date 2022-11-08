export interface TimeFilter {
  year: string;
  month: string;
  day?: string;
  date: string;
}

export interface HeartPayload {
  data: any;
}

export interface DataLayer {
  data: number[];
  labels: number[];
}
