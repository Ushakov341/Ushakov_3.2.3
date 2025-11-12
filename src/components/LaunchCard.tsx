import { Card, Image, Text, Button } from '@mantine/core';
import { Launch } from '../types/launch';

interface LaunchCardProps {
  launch: Launch;
  onSeeMore: (launch: Launch) => void;
}

export function LaunchCard({ launch, onSeeMore }: LaunchCardProps) {
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Card.Section>
        <Image
          src={launch.links?.mission_patch_small || undefined}
          height={200}
          alt={launch.mission_name}
          fallbackSrc="https://placehold.co/200x200?text=No+Image"
        />
      </Card.Section>

      <Text fw={500} size="lg" mt="md" mb="xs">
        {launch.mission_name}
      </Text>

      <Text size="sm" c="dimmed">
        {launch.rocket.rocket_name}
      </Text>

      <Button fullWidth mt="md" onClick={() => onSeeMore(launch)}>
        See more
      </Button>
    </Card>
  );
}