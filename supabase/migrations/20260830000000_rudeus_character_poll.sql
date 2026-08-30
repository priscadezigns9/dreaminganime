-- Rudeus Character of the Week audience poll
insert into public.character_spotlight_polls(slug, character_slug, question, options)
values ('rudeus-greyrat-growth', 'rudeus-greyrat', 'What defines Rudeus the most?', '[{"key":"A","label":"Magical talent"},{"key":"B","label":"Personal growth"},{"key":"C","label":"Resilience"},{"key":"D","label":"Relationships"}]'::jsonb)
on conflict (slug) do update set character_slug=excluded.character_slug, question=excluded.question, options=excluded.options, status='open', updated_at=timezone('utc', now());
