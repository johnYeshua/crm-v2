export class MenuData
{
  USER_ROLE = [ 'All Accounts',     //0
                'Super Admin',      //1
                'Admin Only',       //2
                'User Only',        //3
                'RecruiterManager', //4
                'Recruiter',        //5
                'TrainingManager',  //6
                'Trainer',          //7
                'BD Manager',       //8
                'BusinessDeveloper'];//9

  USER_ROLE_VALUE = [ 'Role',       //0
                      'SuperAdmin', //1
                      'Admin',      //2
                      'User',       //3
                      'Rec_Admin',  //4
                      'Recruiter',  //5
                      'Tech_Admin', //6
                      'Trainer',    //7
                      'BD_Admin',   //8
                      'BD'];        //9
  USER_STATUS = ['All Status', 'Active', 'Suspend'];
  USER_STATUS_VALUE = ['Status', 'Active', 'Suspend'];
  VISA_STATUS = ['F1', 'F1 CPT', 'F1 OPT', 'F1 OPT extension', 'F2', 'H-1b', 'H-2b', 'J1', 'L1', 'M1', 'O1', 'EB', 'BH', 'Others'];
  SOURCE = ['LinkedIn', 'Indeed', 'Dice', 'careerBuilder', 'Other'];
  DEGREE = ['PHD', 'Master', 'Bachelor', 'High School', 'Other'];

  INTERVIEW_FEEDBACK = ['Selected', 'Not Select', 'On Hold'];
  INTERVIEW_STATUS = ['Suitable', 'Not Suitable'];


  LOI_SENT     = ['Yes', 'No'];
  LOI_ACCEPTED = ['Yes', 'No'];
  JOIN_BATCH   = ['Yes', 'No'];


}
