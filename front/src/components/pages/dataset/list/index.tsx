import { useState } from 'react'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Chip,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { styled } from '@mui/material/styles'
import { TypingDataset } from '../type/typing'

const StyledTableContainer = styled(TableContainer)(() => ({
  '& .MuiTable-root': {
    borderCollapse: 'separate',
    borderSpacing: '0 8px',
  },
}))

const StyledTableRow = styled(TableRow)(() => ({
  backgroundColor: '#ffffff',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
  '& td': {
    borderBottom: 'none',
    '&:first-of-type': {
      borderTopLeftRadius: '8px',
      borderBottomLeftRadius: '8px',
    },
    '&:last-of-type': {
      borderTopRightRadius: '8px',
      borderBottomRightRadius: '8px',
    },
  },
}))

// サンプルデータの追加
const sampleDatasets: TypingDataset[] = [
  {
    id: 1,
    title: '基本的な日本語入力',
    difficulty: 'easy',
    problems: new Array(10),
    createdAt: '2024-03-20T10:00:00',
    updatedAt: '2024-03-20T10:00:00',
  },
  {
    id: 2,
    title: 'プログラミング用語集',
    difficulty: 'normal',
    problems: new Array(15),
    createdAt: '2024-03-19T15:30:00',
    updatedAt: '2024-03-19T16:45:00',
  },
  {
    id: 3,
    title: '上級者向け特殊文字',
    difficulty: 'hard',
    problems: new Array(20),
    createdAt: '2024-03-18T09:20:00',
    updatedAt: '2024-03-18T09:20:00',
  },
]

export const DatasetList = () => {
  const [datasets] = useState<TypingDataset[]>(sampleDatasets)
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchDatasets = async () => {
  //     try {
  //       const response = await fetch('/api/datasets');
  //       if (!response.ok) throw new Error('データの取得に失敗しました');
  //       const data = await response.json();
  //       setDatasets(data);
  //     } catch (error) {
  //       console.error(error);
  //       alert('データの取得に失敗しました');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchDatasets();
  // }, []);

  // if (loading) return <div>Loading...</div>;

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: '32px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant='h5'>タイピング問題セット一覧</Typography>
        <Button href='/dataset/create' variant='contained' startIcon={<AddIcon />} sx={{ borderRadius: '8px' }}>
          新規作成
        </Button>
      </Box>

      <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <StyledTableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                <TableCell>タイトル</TableCell>
                <TableCell>難易度</TableCell>
                <TableCell>問題数</TableCell>
                <TableCell>作成日時</TableCell>
                <TableCell>更新日時</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datasets.map((dataset) => (
                <StyledTableRow key={dataset.id} hover>
                  <TableCell>{dataset.title}</TableCell>
                  <TableCell>
                    <Chip
                      label={dataset.difficulty}
                      size='small'
                      color={
                        dataset.difficulty === 'easy'
                          ? 'success'
                          : dataset.difficulty === 'normal'
                            ? 'primary'
                            : 'error'
                      }
                    />
                  </TableCell>
                  <TableCell>{dataset.problems.length}問</TableCell>
                  <TableCell>{new Date(dataset.createdAt).toLocaleString()}</TableCell>
                  <TableCell>{new Date(dataset.updatedAt).toLocaleString()}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </Paper>
    </Box>
  )
}
