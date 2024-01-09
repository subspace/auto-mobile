export function getInitials(fullName: string): string {
  const words = fullName.split(" ")

  let initials = ""

  for (const word of words) {
    if (word.length > 0) {
      initials += word[0].toUpperCase()
    }
  }

  return initials
}
