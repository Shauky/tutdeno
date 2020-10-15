import {
  html,
  useEffect,
} from './deps.ts'

export function Header({ title, children }) {
  useEffect(() => {
    document.title = title
  }, [title])
}
