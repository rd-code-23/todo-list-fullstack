import React from 'react'
import { TableCell, TableRow } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import IconButton from '@material-ui/core/IconButton';

const LargeTable = ({ todo, index, handleDelete, handleEdit, handleComplete, classesEdit, iaAlternateRowColor, handleRowColor }) => {
    return (
        <TableRow className={`${classesEdit}  ${handleRowColor(index, iaAlternateRowColor)} `}>
            <TableCell style={{ borderBottom: "none", width: '95%', textDecoration: `${todo.isComplete ? 'line-through' : 'none'}` }} component="th" scope="row" >
                {todo.text}
            </TableCell>
            <TableCell
                style={{ borderBottom: "none", width: '0%', padding: '5px' }}
                align="right"
                onClick={handleDelete}>
                <IconButton aria-label="delete"><DeleteIcon /></IconButton>
            </TableCell>
            <TableCell
                style={{ borderBottom: "none", width: '0%', padding: '5px' }}
                onClick={handleEdit}>
                <IconButton aria-label="edit"><EditIcon /></IconButton>
            </TableCell>
            <TableCell
                style={{ borderBottom: "none", width: '0%', padding: '5px' }}
                onClick={handleComplete}>
                <IconButton aria-label="complete"><DoneIcon /></IconButton>
            </TableCell>
        </TableRow>
        //    </div>
    )
}

export default LargeTable
