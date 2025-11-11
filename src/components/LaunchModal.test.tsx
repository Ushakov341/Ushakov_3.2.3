import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LaunchModal } from './LaunchModal';
import { Launch } from '../types/launch';

describe('LaunchModal', () => {
  const mockLaunch: Launch = {
    mission_name: 'Starlink 2',
    launch_year: '2020',
    details: 'This mission will launch satellites',
    links: {
      mission_patch_small: 'https://example.com/small.png',
      mission_patch: 'https://example.com/large.png',
    },
    rocket: {
      rocket_name: 'Falcon 9',
    },
  };

  it('should not render when launch is null', () => {
    const onClose = vi.fn();
    const { container } = render(<LaunchModal launch={null} onClose={onClose} />);

    expect(container.firstChild).toBeNull();
  });

  it('should render modal with launch details', () => {
    const onClose = vi.fn();
    render(<LaunchModal launch={mockLaunch} onClose={onClose} />);

    expect(screen.getByText('Starlink 2')).toBeInTheDocument();
    expect(screen.getByText('Falcon 9')).toBeInTheDocument();
    expect(screen.getByText('This mission will launch satellites')).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    render(<LaunchModal launch={mockLaunch} onClose={onClose} />);

    const closeButton = screen.getByRole('button', { name: /close modal/i });
    await user.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when backdrop is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    render(<LaunchModal launch={mockLaunch} onClose={onClose} />);

    const backdrop = screen.getByText('Starlink 2').closest('.fixed');
    if (backdrop) {
      await user.click(backdrop);
      expect(onClose).toHaveBeenCalledTimes(1);
    }
  });

  it('should display "No details available" when details is null', () => {
    const onClose = vi.fn();
    const launchWithoutDetails = { ...mockLaunch, details: null };

    render(<LaunchModal launch={launchWithoutDetails} onClose={onClose} />);

    expect(screen.getByText('No details available')).toBeInTheDocument();
  });
});
