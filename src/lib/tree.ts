export class TreeNode<T> {
	data: T;
	children: TreeNode<T>[] = [];
	parent?: TreeNode<T>;

	public constructor(data: T) {
		this.data = data;
	}

	public add_child(child: TreeNode<T>): TreeNode<T> {
		child.parent = this;
		this.children.push(child);
		return child;
	}

	public add_children(children: TreeNode<T>[]): void {
		for (const child of children) {
			child.parent = this;
		}
		this.children.push(...children);
	}

	/**
	 * Will not copy data.
	 * @returns Deep copy of the tree.
	 */
	public deep_copy(): TreeNode<T> {
		const clone = new TreeNode(this.data);
		clone.add_children(this.children.map((child) => child.deep_copy()));
		return clone;
	}

	public deep_copy_filter(filter: (node: TreeNode<T>) => boolean): TreeNode<T> {
		const clone = new TreeNode(this.data);
		clone.add_children(this.children.filter(filter).map((child) => child.deep_copy()));
		return clone;
	}

	// eslint-disable-next-line @typescript-eslint/no-inferrable-types
	public find_parents(include_this: boolean = false): TreeNode<T>[] {
		const parents = [];
		let p: TreeNode<T> | undefined = include_this ? this : this.parent;
		while (p) {
			parents.unshift(p);
			p = p.parent;
		}
		return parents;
	}
}
