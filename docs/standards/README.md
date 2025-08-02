# Code Standards & Quality Files

This folder contains all files related to code quality, formatting standards, and development best practices for the hotel management application.

## 📋 Files Overview

### `.eslintrc.json`

- **Purpose**: ESLint configuration for code quality enforcement
- **Content**: Code style rules, best practices, and error prevention
- **Size**: 951B with 32 lines of configuration
- **Usage**: Automated code quality checks and linting

### `.prettierrc`

- **Purpose**: Prettier configuration for consistent code formatting
- **Content**: Code formatting rules and style preferences
- **Size**: 308B with 16 lines of formatting rules
- **Usage**: Automated code formatting and style consistency

### `.prettierignore`

- **Purpose**: Files and directories to exclude from Prettier formatting
- **Content**: Patterns for files that should not be formatted
- **Size**: 1.2KB with 109 lines of ignore patterns
- **Usage**: Prevents formatting of generated files and dependencies

## 🎯 Code Quality Standards

### ESLint Rules

- **Code Style**: Consistent indentation and spacing
- **Best Practices**: Modern JavaScript/TypeScript patterns
- **Error Prevention**: Common coding mistakes detection
- **Accessibility**: Accessibility-focused linting rules
- **Performance**: Performance optimization suggestions

### Prettier Configuration

- **Indentation**: 2 spaces for consistent formatting
- **Line Length**: 80 characters for readability
- **Quotes**: Single quotes for strings
- **Semicolons**: Required for statement termination
- **Trailing Commas**: Consistent trailing comma usage

### Code Organization

- **File Structure**: Consistent file and folder organization
- **Import Order**: Organized import statements
- **Component Structure**: Standardized component patterns
- **Type Definitions**: Consistent TypeScript type usage

## 🔧 Usage Instructions

### Code Quality Checks

```bash
# Run ESLint on all files
npx eslint src/ --ext .ts,.tsx,.js,.jsx

# Run ESLint with auto-fix
npx eslint src/ --ext .ts,.tsx,.js,.jsx --fix

# Check specific file
npx eslint src/components/Header/index.tsx
```

### Code Formatting

```bash
# Format all files with Prettier
npx prettier --write src/

# Format specific file
npx prettier --write src/components/Header/index.tsx

# Check formatting without changes
npx prettier --check src/
```

### Pre-commit Hooks

```bash
# Install pre-commit hooks
npx husky install

# Add lint-staged configuration
npm install --save-dev lint-staged
```

## 📊 Quality Metrics

### Code Quality Targets

| Metric          | Target  | Current        |
| --------------- | ------- | -------------- |
| ESLint Errors   | 0       | [Check Report] |
| ESLint Warnings | < 10    | [Check Report] |
| Code Coverage   | > 80%   | [Check Report] |
| Bundle Size     | < 500KB | [Check Report] |

### Formatting Standards

- **Consistent Indentation**: 2 spaces
- **Line Length**: Maximum 80 characters
- **File Encoding**: UTF-8
- **Line Endings**: LF (Unix style)
- **Trailing Spaces**: None allowed

## 🚀 Best Practices

### Code Organization

- Use meaningful file and folder names
- Group related components together
- Separate concerns (UI, logic, data)
- Follow single responsibility principle

### Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile`)
- **Files**: kebab-case (e.g., `user-profile.tsx`)
- **Variables**: camelCase (e.g., `userName`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)

### TypeScript Standards

- Use strict TypeScript configuration
- Define proper type interfaces
- Avoid `any` type usage
- Use proper generic types

### Component Standards

- Use functional components with hooks
- Implement proper prop validation
- Follow React best practices
- Use proper error boundaries

## 📝 Configuration Details

### ESLint Configuration

```json
{
  "extends": [
    "next/core-web-vitals",
    "eslint:recommended",
    "@typescript-eslint/recommended"
  ],
  "rules": {
    "no-unused-vars": "error",
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

### Prettier Configuration

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

## 🔄 Continuous Integration

Code quality is enforced through:

- Pre-commit hooks with lint-staged
- CI/CD pipeline quality checks
- Automated formatting on save
- Regular code reviews
- Quality gate enforcement

## 📚 Resources

### Documentation

- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)
- [TypeScript Guidelines](https://www.typescriptlang.org/docs/)
- [React Best Practices](https://react.dev/learn)

### Tools

- **ESLint**: Code quality and error prevention
- **Prettier**: Code formatting and style consistency
- **TypeScript**: Type safety and development experience
- **Husky**: Git hooks for quality enforcement

## 📝 Notes

- All configurations are optimized for Next.js projects
- Standards follow industry best practices
- Configurations are team-friendly and maintainable
- Regular updates to keep up with latest standards
