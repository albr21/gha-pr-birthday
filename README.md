# gha-pr-birthday

GitHub Action to celebrate PR birthdays.

## Usage

```yaml
name: 🤖 Celebrate PR Birthday

on:
  schedule:
    - cron: '0 0 * * *'

jobs:
  celebrate-pr-birthdays:
    runs-on: <runner>
    name: Celebrate PR Birthday
    steps:
      - name: Celebrate PR Birthday
        uses: albr21/gha-pr-birthday@1.0.0
```

## Contributing

Check out the [CONTRIBUTING](CONTRIBUTING.md) file for guidelines on how to contribute to this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
