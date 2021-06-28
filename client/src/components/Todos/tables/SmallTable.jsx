import React from 'react'
import { TableCell, TableRow, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import IconButton from '@material-ui/core/IconButton';

const SmallTable = ({ todo, index, iaAlternateRowColor, handleDelete, handleEdit, handleComplete, classesEdit, handleRowColor }) => {
    return (
        <>
            <TableRow className={`${classesEdit}  ${handleRowColor(index, iaAlternateRowColor)} `} >
                <TableCell style={{ borderBottom: "none", textAlign: "center", textDecoration: `${todo.isComplete ? 'line-through' : 'none'}` }}
                    component="th"
                    scope="row"
                    align="center"
                    colSpan={3}>

                    <div style={{ overflow: "auto", textOverflow: "ellipsis" }}>
                        <Typography  >
                            {todo.text}
                        </Typography>
                    </div>
                </TableCell>

            </TableRow>
            <TableRow className={`${classesEdit}   ${handleRowColor(index, iaAlternateRowColor)}`} >
                <TableCell
                    style={{ borderBottom: "none", padding: '0', }}
                    align="center"
                    onClick={handleDelete}  >
                    <IconButton aria-label="delete"><DeleteIcon /></IconButton>
                </TableCell>
                <TableCell
                    style={{ borderBottom: "none", padding: '0', width: '100%' }}
                    onClick={handleEdit}
                    align="center">

                    <IconButton aria-label="edit"><EditIcon /></IconButton>
                </TableCell>
                <TableCell
                    style={{ borderBottom: "none", padding: '0', }}
                    onClick={handleComplete}
                    align="center">
                    <IconButton aria-label="complete"><DoneIcon /></IconButton>
                </TableCell>
            </TableRow>

        </>


    )
}

export default SmallTable
