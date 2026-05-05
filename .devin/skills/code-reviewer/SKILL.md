# Code Reviewer Skill

A comprehensive code reviewer skill that analyzes git changes and provides detailed feedback on code quality, best practices, potential issues, and improvements.

## Usage

Invoke this skill to review code changes. It will:
1. Analyze all unstaged changes in the current repository
2. Review modified files for code quality, best practices, and potential issues
3. Provide detailed feedback organized by file
4. Suggest improvements and highlight strengths

## What it reviews

- **Code Quality**: Clean code principles, readability, maintainability
- **Best Practices**: Language/framework-specific conventions and patterns
- **Potential Issues**: Bugs, security vulnerabilities, performance concerns
- **Testing**: Test coverage, test quality, edge cases
- **Documentation**: Code comments, documentation completeness
- **Type Safety**: Type usage, potential type-related issues
- **Error Handling**: Proper error handling and edge case coverage

## Review Criteria

The skill follows these principles:
1. **Constructive Feedback**: Focus on actionable improvements
2. **Context-Aware**: Consider project-specific patterns and conventions
3. **Balanced**: Highlight both strengths and areas for improvement
4. **Educational**: Explain why changes are recommended
5. **Priority-Based**: Flag critical issues vs. nice-to-have improvements

## Output Format

The review provides:
- **Summary**: High-level overview of changes
- **File-by-File Analysis**: Detailed review of each modified file
- **Issues Found**: Categorized by severity (Critical, Major, Minor)
- **Suggestions**: Specific improvement recommendations
- **Positive Notes**: Strengths and good practices observed
- **Overall Assessment**: Final recommendation

## Example Invocation

```
"Review all unstaged changes in this repository and provide detailed feedback on code quality, potential issues, and improvements."
```