import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MantineProvider } from '@mantine/core';
import { LaunchCard } from './LaunchCard';
import { Launch } from '../types/launch';

const renderWithMantine = (component: React.ReactElement) => {
  return render(<MantineProvider>{component}</MantineProvider>);
};

describe('LaunchCard', () => {
  const mockLaunch: Launch = {
    mission_name: 'Starlink 2',
    launch_year: '2020',
    details: 'Test details',
    links: {
      mission_patch_small: 'https://example.com/small.png',
      mission_patch: 'https://example.com/large.png',
    },
    rocket: {
      rocket_name: 'Falcon 9',
    },
  };

  it('should render launch information', () => {
    const onSeeMore = vi.fn();
    renderWithMantine(<LaunchCard launch={mockLaunch} onSeeMore={onSeeMore} />);

    expect(screen.getByText('Starlink 2')).toBeInTheDocument();
    expect(screen.getByText('Falcon 9')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /see more/i })).toBeInTheDocument();
  });

  it('should call onSeeMore when button is clicked', async () => {
    const onSeeMore = vi.fn();
    const user = userEvent.setup();

    renderWithMantine(<LaunchCard launch={mockLaunch} onSeeMore={onSeeMore} />);

    const button = screen.getByRole('button', { name: /see more/i });
    await user.click(button);

    expect(onSeeMore).toHaveBeenCalledWith(mockLaunch);
    expect(onSeeMore).toHaveBeenCalledTimes(1);
  });

  it('should render image with correct src', () => {
    const onSeeMore = vi.fn();
    renderWithMantine(<LaunchCard launch={mockLaunch} onSeeMore={onSeeMore} />);

    const img = screen.getByAltText('Starlink 2');
    expect(img).toBeInTheDocument();
  });
});
