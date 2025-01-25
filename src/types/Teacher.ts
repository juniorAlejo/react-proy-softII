export interface TeacherDto {
    idTeacher?: number;
    firstName: string;
    lastName: string;
    gender:boolean;
    position: string;
    image?: string;
    facebook?:string;
    linkedIn?:string;
    registrationCode:string;
    mail?: string;
    phone?: string;
    description: string;
    birthDate?: string;
    workExperiences: WorkExperience[]; 
    teachingExperiences: ExperienceTeacher[]; 
    thesisAdvisingExperiences: ExperienceThesisAdvisor[];
  }
  
  export interface WorkExperience {
    id?: number;
    companyName: string;
    position: string;
    jobDescription: string;
    jobIdi: string;
    startDate: string;
    endDate?: string;
    isCurrent:boolean;
  }
  
  export interface ExperienceTeacher {
    id?: number;
    institution: string;
    institutionType: string;
    teacherType: string;
    jobDescription: string;
    startDate: string;
    endDate?: string;
  }
  
  export interface ExperienceThesisAdvisor {
    id?: number;
    university: string;
    thesis: string;
    thesisStudent: string;
    repository: string;
    thesisAcceptanceDate: string;
  }
  