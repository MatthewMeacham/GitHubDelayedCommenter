import { ICollaboratorReference } from "./ICollaboratorReference";

export interface IRepositoryReference {
	name: string;
	url: string;
	collaborators: ICollaboratorReference[];
}
