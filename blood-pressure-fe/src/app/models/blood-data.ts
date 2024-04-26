export type BloodData = {
  id?: number;
  sys: number;
  dia: number;
  pulse: number;
  recorded: Date;
  other: string;
  mood?: string;
};
