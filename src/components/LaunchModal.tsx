import { useEffect } from 'react';
import { X } from 'lucide-react';
import { Launch } from '../types/launch';
import { Portal } from './Portal';

interface LaunchModalProps {
  launch: Launch | null;
  onClose: () => void;
}

export function LaunchModal({ launch, onClose }: LaunchModalProps) {
  useEffect(() => {
    if (launch) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [launch]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (launch) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [launch, onClose]);

  if (!launch) {
    return null;
  }

  return (
    <Portal>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">{launch.mission_name}</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6">
            {launch.links?.mission_patch && (
              <div className="flex justify-center mb-6">
                <img
                  src={launch.links.mission_patch}
                  alt={launch.mission_name}
                  className="max-w-xs w-full h-auto"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/400x400?text=No+Image';
                  }}
                />
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-1">Mission name:</h3>
                <p className="text-gray-600">{launch.mission_name}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-1">Rocket name:</h3>
                <p className="text-gray-600">{launch.rocket.rocket_name}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-1">Details:</h3>
                <p className="text-gray-600">
                  {launch.details || 'No details available'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
}
