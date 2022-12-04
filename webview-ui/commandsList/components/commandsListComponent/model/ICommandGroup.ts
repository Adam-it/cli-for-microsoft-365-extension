import { ICommand } from '../../../../../models/ICommand';


export interface ICommandGroup {
    name: string;
    isExpanded: boolean;
    commandGroup: ICommandGroup[];
    commands: ICommand[];
}