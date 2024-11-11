import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  TablePagination,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

export interface TypingProblem {
  id: number
  displayText: string
  hiragana: string
}

interface TypingDatasetFormProps {
  problems: TypingProblem[]
  setProblems: React.Dispatch<React.SetStateAction<TypingProblem[]>>
}

interface EditDialogProps {
  open: boolean
  problem: TypingProblem | null
  onClose: () => void
  onSave: (problem: TypingProblem) => void
}

const EditDialog = ({ open, problem, onClose, onSave }: EditDialogProps) => {
  const [editedDisplayText, setEditedDisplayText] = useState(problem?.displayText || '')
  const [editedHiragana, setEditedHiragana] = useState(problem?.hiragana || '')

  const handleSave = () => {
    if (!problem) return
    onSave({
      ...problem,
      displayText: editedDisplayText.trim(),
      hiragana: editedHiragana.trim(),
    })
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>問題を編集</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          label='表示文'
          fullWidth
          value={editedDisplayText}
          onChange={(e) => setEditedDisplayText(e.target.value)}
        />
        <TextField
          margin='dense'
          label='ひらがな'
          fullWidth
          value={editedHiragana}
          onChange={(e) => setEditedHiragana(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        <Button onClick={handleSave} variant='contained'>
          保存
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export const TypingDatasetForm = ({ problems, setProblems }: TypingDatasetFormProps) => {
  const [selected, setSelected] = useState<number[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [editingProblem, setEditingProblem] = useState<TypingProblem | null>(null)

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = problems.map((n) => n.id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleClick = (id: number) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected: number[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }

    setSelected(newSelected)
  }

  const handleDelete = (id: number) => {
    setProblems(problems.filter((problem) => problem.id !== id))
    setSelected(selected.filter((selectedId) => selectedId !== id))
  }

  const handleBulkDelete = () => {
    if (selected.length === 0) return

    if (window.confirm(`選択した${selected.length}件のデータを削除しますか？`)) {
      setProblems(problems.filter((problem) => !selected.includes(problem.id)))
      setSelected([])
    }
  }

  const handleEdit = (problem: TypingProblem) => {
    setEditingProblem(problem)
  }

  const handleSaveEdit = (editedProblem: TypingProblem) => {
    setProblems(problems.map((p) => (p.id === editedProblem.id ? editedProblem : p)))
    setEditingProblem(null)
  }

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Button variant='contained' color='success' sx={{ mr: 1 }}>
            保存
          </Button>
          <Button variant='outlined' color='error' onClick={handleBulkDelete} disabled={selected.length === 0}>
            一括削除
          </Button>
        </div>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding='checkbox'>
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < problems.length}
                  checked={problems.length > 0 && selected.length === problems.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>表示文</TableCell>
              <TableCell>ひらがな</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {problems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((problem) => {
              const isItemSelected = selected.indexOf(problem.id) !== -1

              return (
                <TableRow
                  hover
                  onClick={() => handleClick(problem.id)}
                  role='checkbox'
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={problem.id}
                  selected={isItemSelected}
                >
                  <TableCell padding='checkbox'>
                    <Checkbox checked={isItemSelected} />
                  </TableCell>
                  <TableCell>{problem.id}</TableCell>
                  <TableCell>{problem.displayText}</TableCell>
                  <TableCell>{problem.hiragana}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEdit(problem)
                      }}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(problem.id)
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={problems.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10))
          setPage(0)
        }}
      />

      <EditDialog
        open={editingProblem !== null}
        problem={editingProblem}
        onClose={() => setEditingProblem(null)}
        onSave={handleSaveEdit}
      />
    </Paper>
  )
}
