/*
  # Learning Platform Database Schema

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key, references auth.users)
      - `username` (text)
      - `total_points` (integer, default 0)
      - `current_streak` (integer, default 0)
      - `skill_level` (text, default 'beginner')
      - `last_activity` (timestamptz)
      - `created_at` (timestamptz, default now())
    
    - `learning_modules`
      - `id` (uuid, primary key)
      - `title` (text)
      - `level` (text: beginner, intermediate, advanced)
      - `order_index` (integer)
      - `duration` (text)
      - `content` (jsonb)
      - `points` (integer)
      - `created_at` (timestamptz, default now())
    
    - `module_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `module_id` (uuid, references learning_modules)
      - `completed` (boolean, default false)
      - `progress_percentage` (integer, default 0)
      - `completed_at` (timestamptz)
      - `created_at` (timestamptz, default now())
    
    - `lab_completions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `lab_type` (text)
      - `completed` (boolean, default false)
      - `points_earned` (integer)
      - `completed_at` (timestamptz)
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- User Profiles Table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text,
  total_points integer DEFAULT 0,
  current_streak integer DEFAULT 0,
  skill_level text DEFAULT 'beginner',
  last_activity timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Learning Modules Table
CREATE TABLE IF NOT EXISTS learning_modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  level text NOT NULL,
  order_index integer NOT NULL,
  duration text NOT NULL,
  content jsonb NOT NULL,
  points integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE learning_modules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view modules"
  ON learning_modules FOR SELECT
  TO authenticated
  USING (true);

-- Module Progress Table
CREATE TABLE IF NOT EXISTS module_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  module_id uuid NOT NULL REFERENCES learning_modules(id),
  completed boolean DEFAULT false,
  progress_percentage integer DEFAULT 0,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, module_id)
);

ALTER TABLE module_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress"
  ON module_progress FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own progress"
  ON module_progress FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own progress"
  ON module_progress FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Lab Completions Table
CREATE TABLE IF NOT EXISTS lab_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  lab_type text NOT NULL,
  completed boolean DEFAULT false,
  points_earned integer DEFAULT 0,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, lab_type)
);

ALTER TABLE lab_completions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own completions"
  ON lab_completions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own completions"
  ON lab_completions FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own completions"
  ON lab_completions FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
