import { ICommand } from '../../../../../models/ICommand';


export interface ICommandGroup {
    name: string;
    isExpanded: boolean;
    commandGroups: ICommandGroup[];
    commands: ICommand[];
}