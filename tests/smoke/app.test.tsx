import { render, screen } from '@testing-library/react';
import Home from '@/app/[locale]/page';

// Mock next-intl хуки
jest.mock('next-intl', () => ({
  useTranslations: () => {
    return {
      raw: jest.fn().mockImplementation((key) => {
        if (key === 'features.items') {
          return [
            {
              title: 'Feature 1',
              description: 'Description 1'
            },
            {
              title: 'Feature 2',
              description: 'Description 2'
            },
            {
              title: 'Feature 3',
              description: 'Description 3'
            }
          ];
        }
        return '';
      }),
      // Простая функция для симуляции переводов
      __esModule: true,
      default: (key: string) => {
        const translations: Record<string, string> = {
          'hero.title': 'Test Title',
          'hero.subtitle': 'Test Subtitle',
          'hero.cta': 'Get Started',
          'features.title': 'Features',
        };
        return translations[key] || key;
      }
    };
  }
}));

describe('Smoke Test - App', () => {
  it('renders home page without crashing', () => {
    render(<Home />);
    
    // Проверяем, что основные элементы страницы рендерятся
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Get Started')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
    
    // Проверяем, что рендерятся элементы из карточек features
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 2')).toBeInTheDocument();
    expect(screen.getByText('Feature 3')).toBeInTheDocument();
  });
}); 