export interface TreeNode {
    name: string;
    level: number;
    children?: TreeNode[];
    permissionStatus?: boolean; // Only for privilege nodes
}
