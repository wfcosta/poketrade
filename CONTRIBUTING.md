# Contributing to PokéTrade

Thank you for your interest in contributing to PokéTrade! We welcome contributions from the community. This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful and constructive in all interactions. We are committed to providing a welcoming and inclusive environment for all contributors.

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm 10+
- MySQL 8.0+
- Git

### Setup Development Environment

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/poketrade.git
   cd poketrade
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Setup database**
   ```bash
   pnpm db:push
   ```

5. **Start development server**
   ```bash
   pnpm dev
   ```

## Development Workflow

### Creating a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

Use descriptive branch names:
- `feature/` for new features
- `fix/` for bug fixes
- `docs/` for documentation
- `test/` for tests
- `refactor/` for code refactoring

### Making Changes

1. **Write code** following TypeScript best practices
2. **Add tests** for new functionality
3. **Update documentation** if needed
4. **Run linting and formatting**
   ```bash
   pnpm format
   pnpm tsc --noEmit
   ```

### Testing

#### Unit Tests
```bash
# Run all unit tests
pnpm test

# Run specific test file
pnpm test server/cards.test.ts

# Watch mode
pnpm test --watch
```

#### E2E Tests
```bash
# Run all E2E tests
pnpm test:e2e

# Run specific test
pnpm test:e2e e2e/auth.spec.ts

# UI mode
pnpm test:e2e --ui
```

### Committing Changes

Use conventional commit messages:

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
test: Add tests
refactor: Refactor code
style: Format code
chore: Update dependencies
```

Example:
```bash
git commit -m "feat: Add wishlist functionality"
git commit -m "fix: Resolve checkout payment issue"
git commit -m "test: Add E2E tests for chat"
```

### Pushing Changes

```bash
git push origin feature/your-feature-name
```

## Pull Request Process

1. **Update your branch** with latest main
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Create a Pull Request** on GitHub
   - Use a descriptive title
   - Reference related issues
   - Describe changes in detail
   - Include screenshots for UI changes

3. **PR Template**
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## Related Issues
   Closes #123

   ## Testing
   Describe how to test changes

   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Tests added/updated
   - [ ] Documentation updated
   - [ ] No breaking changes
   ```

4. **Address Review Comments**
   - Make requested changes
   - Push updates to the same branch
   - Request re-review

5. **Merge**
   - Maintainers will merge when approved
   - Squash commits if requested

## Coding Standards

### TypeScript
- Use strict mode
- Avoid `any` types
- Use interfaces for object shapes
- Add JSDoc comments for public functions

```typescript
/**
 * Fetch user by ID
 * @param userId - The user's ID
 * @returns User object or null if not found
 */
export async function getUserById(userId: number): Promise<User | null> {
  // Implementation
}
```

### React Components
- Use functional components with hooks
- Keep components focused and reusable
- Add prop types with TypeScript
- Use meaningful variable names

```typescript
interface CardProps {
  id: number;
  name: string;
  price: number;
  onSelect: (id: number) => void;
}

export function Card({ id, name, price, onSelect }: CardProps) {
  return (
    <div onClick={() => onSelect(id)}>
      <h3>{name}</h3>
      <p>${price}</p>
    </div>
  );
}
```

### Database Queries
- Use Drizzle ORM for type safety
- Add indexes for frequently queried columns
- Write efficient queries
- Add comments for complex logic

```typescript
export async function getActiveCards(limit: number, offset: number) {
  return db
    .select()
    .from(cards)
    .where(eq(cards.status, 'active'))
    .limit(limit)
    .offset(offset);
}
```

### Tests
- Write descriptive test names
- Test happy path and edge cases
- Use meaningful assertions
- Keep tests focused

```typescript
describe('Card API', () => {
  it('should fetch active cards with pagination', async () => {
    const cards = await getActiveCards(10, 0);
    expect(cards).toHaveLength(10);
    expect(cards[0].status).toBe('active');
  });

  it('should return empty array when no cards found', async () => {
    const cards = await getActiveCards(10, 1000);
    expect(cards).toEqual([]);
  });
});
```

## Documentation

### README Updates
- Keep README.md current
- Add examples for new features
- Update API documentation
- Include setup instructions

### Code Comments
- Explain "why", not "what"
- Keep comments up-to-date
- Use JSDoc for public APIs
- Avoid obvious comments

```typescript
// ❌ Bad - obvious comment
const user = getUserById(1); // Get user with ID 1

// ✅ Good - explains intent
// Cache user to avoid repeated database queries
const user = await getUserById(1);
```

## Reporting Issues

### Bug Reports
Include:
- Description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots/videos if applicable
- Environment details (OS, browser, Node version)

### Feature Requests
Include:
- Description of the feature
- Use case and motivation
- Proposed implementation (optional)
- Related issues or discussions

## Performance Considerations

- Optimize database queries
- Minimize bundle size
- Use lazy loading for images
- Implement pagination for large lists
- Cache frequently accessed data

## Security

- Never commit secrets or API keys
- Validate all user inputs
- Use parameterized queries
- Keep dependencies updated
- Follow OWASP guidelines

## Getting Help

- **GitHub Issues** - Report bugs and request features
- **GitHub Discussions** - Ask questions and share ideas
- **Pull Request Reviews** - Get feedback on your changes

## Recognition

Contributors will be recognized in:
- CONTRIBUTORS.md file
- GitHub contributors page
- Release notes for significant contributions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to PokéTrade! 🎉
