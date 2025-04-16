#!/bin/bash

# Скрипт для проверки кода проекта SuperLanding
# Запускает линтер, проверку типов и тесты

# Цвета для вывода
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== Запуск проверки кода SuperLanding ===${NC}\n"

# Запуск линтера
echo -e "${YELLOW}Запуск ESLint...${NC}"
yarn lint
LINT_RESULT=$?

if [ $LINT_RESULT -eq 0 ]; then
  echo -e "${GREEN}✓ Линтер не обнаружил ошибок${NC}\n"
else
  echo -e "${RED}✗ Линтер обнаружил ошибки${NC}\n"
fi

# Проверка типов
echo -e "${YELLOW}Запуск проверки типов...${NC}"
yarn type-check
TYPE_CHECK_RESULT=$?

if [ $TYPE_CHECK_RESULT -eq 0 ]; then
  echo -e "${GREEN}✓ Проверка типов прошла успешно${NC}\n"
else
  echo -e "${RED}✗ Ошибки в проверке типов${NC}\n"
fi

# Запуск unit-тестов
echo -e "${YELLOW}Запуск unit-тестов...${NC}"
yarn test
TEST_RESULT=$?

if [ $TEST_RESULT -eq 0 ]; then
  echo -e "${GREEN}✓ Unit-тесты прошли успешно${NC}\n"
else
  echo -e "${RED}✗ Ошибки в unit-тестах${NC}\n"
fi

# Запуск smoke-тестов
echo -e "${YELLOW}Запуск smoke-тестов...${NC}"
yarn test:smoke
SMOKE_TEST_RESULT=$?

if [ $SMOKE_TEST_RESULT -eq 0 ]; then
  echo -e "${GREEN}✓ Smoke-тесты прошли успешно${NC}\n"
else
  echo -e "${RED}✗ Ошибки в smoke-тестах${NC}\n"
fi

# Вывод итогового результата
echo -e "${YELLOW}=== Итоговый результат ===${NC}"

if [ $LINT_RESULT -eq 0 ] && [ $TYPE_CHECK_RESULT -eq 0 ] && [ $TEST_RESULT -eq 0 ] && [ $SMOKE_TEST_RESULT -eq 0 ]; then
  echo -e "${GREEN}✓ Все проверки прошли успешно${NC}"
  exit 0
else
  echo -e "${RED}✗ Обнаружены проблемы в коде${NC}"
  exit 1
fi 