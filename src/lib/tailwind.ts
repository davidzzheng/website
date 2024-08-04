import plugin from 'tailwindcss/plugin'

export const decorateUnderline = plugin(function ({ addComponents, theme }) {
  const colors = theme('colors') as Record<string, string | Record<string, string>>

  const baseStyle = (color: string) => ({
    display: 'inline-block',
    textDecoration: 'none',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      width: '100%',
      transform: 'scaleX(0)',
      height: '2px',
      bottom: '0',
      left: '0',
      transformOrigin: 'bottom right',
      transition: 'transform 0.25s ease-out',
    },
    '&:hover, &.selected': {
      '&::after': {
        transform: 'scaleX(1)',
        transformOrigin: 'bottom left',
        backgroundColor: color,
      },
    },
  })

  Object.keys(colors).forEach((colorName) => {
    const color = colors[colorName]

    if (typeof color === 'object') {
      Object.keys(color).forEach((shade) => {
        addComponents({
          [`.decorate-underline-${colorName}-${shade}`]: baseStyle(color[shade]),
        })
      })
    } else {
      addComponents({
        [`.decorate-underline-${colorName}`]: baseStyle(color),
      })
    }
  })

  addComponents({
    '.decorate-underline': baseStyle(theme('colors.foreground')),
  })
})
