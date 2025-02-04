export interface ExperienceLaboral {
  id?: number;
  companyName: string,
  position: string,
  jobDescription: string,
  jobIdi: string,
  startDate:string,
  endDate:string,
  isCurrent: boolean,
  teacherId?: number
}

export interface ExperienceLaboralDocente {
  id?: number;
  institution: string,
  institutionType: number | string,
  teacherType: number | string,
  jobDescription: string,
  startDate: string,
  endDate: string,
  teacherId?:number
}

export interface ExperienceTesis {
  id?: number;
  university: string,
  thesis: string,
  thesisStudent: string,
  repository: string,
  thesisAcceptanceDate:string,
  teacherId?: number
}
