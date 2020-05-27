import React from 'react';
import { TreeView, TreeItem } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import './Categories.scss';

const categories = [
    {
        id: 'root1',
        name: 'Fruits & Veg.',
        children: [
            {
                id: '1',
                name: 'Child - 1',
            },
            {
                id: '3',
                name: 'Child - 3',
                children: [
                    {
                        id: '4',
                        name: 'Child - 4',
                    },
                ],
            },
        ],
    },
    {
        id: 'root2',
        name: 'Bakery, Cakes &Dairy',
        children: [
            {
                id: '1',
                name: 'Child - 1',
            },
            {
                id: '3',
                name: 'Child - 3',
                children: [
                    {
                        id: '4',
                        name: 'Child - 4',
                    },
                ],
            },
        ],
    },
    {
        id: 'root3',
        name: 'Cleaning & Household',
        children: [
            {
                id: '1',
                name: 'Child - 1',
            },
            {
                id: '3',
                name: 'Child - 3',
                children: [
                    {
                        id: '4',
                        name: 'Child - 4',
                    },
                ],
            },
        ],
    },
    {
        id: 'root4',
        name: 'Beauty & Hygiene',
        children: [
            {
                id: '1',
                name: 'Child - 1',
            },
            {
                id: '3',
                name: 'Child - 3',
                children: [
                    {
                        id: '4',
                        name: 'Child - 4',
                    },
                ],
            },
        ],
    }
];


const Categories = (props) => {

    const renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name} className="category">
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
    );

    return (
        <div className="categories d-flex">
            {categories.map(cat =>
                <TreeView
                    className='tree-root category'
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    // defaultExpanded={['root']}
                    defaultExpandIcon={<ChevronRightIcon />}
                >
                    {renderTree(cat)}
                </TreeView>
            )}

        </div>
    );
}

export default Categories;