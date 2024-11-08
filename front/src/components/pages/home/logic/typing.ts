import { MappingType } from './mapping'
import { Mapping } from './mapping'

const MappingDict = Mapping as MappingType

const getNextTypeList = (input: string): MappingType => {
  return MappingDict.map((m) => {
    return input.startsWith(m.Pattern) ? m : []
  }).flat()
}

const getCharFromTyped = (typed: string): string => {
  const char = MappingDict.find((m) => m.TypePattern.includes(typed))
  if (!char) throw Error('Error: 意図しない挙動を確認しました')
  return char.Pattern
}

type ResponseType = {
  restTargetText: string
  removedTargetText: string
  correctTypedNum: number
}

export function typing(targetHiraganaText: string, userTyped: string): ResponseType {
  let target = targetHiraganaText
  const typeList = getNextTypeList(target)
  const allowedAlphabets = typeList.map((t) => t.TypePattern).flat()
  const typed = userTyped
  const typedAllowedAlphabets = allowedAlphabets.find((a) => typed.includes(a))
  const isCorrect = typedAllowedAlphabets !== undefined
  if (isCorrect) {
    const char = getCharFromTyped(typedAllowedAlphabets)
    target = target.substring(char.length)
    return {
      restTargetText: target,
      removedTargetText: char,
      // ToDo 正確にはローマ字の数を返したい
      correctTypedNum: char.length,
    }
  } else {
    return {
      restTargetText: target,
      removedTargetText: '',
      correctTypedNum: 0,
    }
  }
}
